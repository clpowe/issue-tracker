'use client'

import { Button, TextField, Callout, Text } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '../../validationSchema'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

type IssueForm = z.infer<typeof createIssueSchema>

function NewIssuesPage() {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema)
	})
	const router = useRouter()
	const [error, setError] = useState('')
	const [isSubmitting, setSubmitting] = useState(false)

	const onSubmit = handleSubmit(async (data) => {
		try {
			setSubmitting(true)
			await axios.post('/api/issues', data)
			router.push('/issues')
		} catch (error) {
			setSubmitting(false)
			setError('An unexpected error has occurred')
		}
	})

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form onSubmit={onSubmit} className=' space-y-3'>
				<TextField.Root>
					<TextField.Input placeholder='Title' {...register('title')} />
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>
				<Controller
					name='description'
					control={control}
					render={({ field }) => <SimpleMDE {...field} />}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					Submit new issue {isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	)
}

export default NewIssuesPage
