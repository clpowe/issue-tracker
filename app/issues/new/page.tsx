'use client'

import { Button, TextField, Callout, Text } from '@radix-ui/themes'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import axios from 'axios'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '../../validationSchema'
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

	return (
		<div className='max-w-xl'>
			{error && (
				<Callout.Root color='red' className='mb-5'>
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post('/api/issues', data)
						router.push('/issues')
					} catch (error) {
						setError('An unexpected error has occurred')
					}
				})}
				className=' space-y-3'
			>
				<TextField.Root>
					<TextField.Input placeholder='Title' {...register('title')} />
				</TextField.Root>
				{errors.title && (
					<Text as='p' color='red'>
						{errors.title.message}
					</Text>
				)}
				<Controller
					name='description'
					control={control}
					render={({ field }) => <SimpleMDE {...field} />}
				/>
				{errors.description && (
					<Text as='p' color='red'>
						{errors.description.message}
					</Text>
				)}
				<Button>Submit new issue</Button>
			</form>
		</div>
	)
}

export default NewIssuesPage
