'use client'

import { Button, TextField, Callout } from '@radix-ui/themes'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import axios from 'axios'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface IssueForm {
	title: string
	description: string
}

function NewIssuesPage() {
	const { register, control, handleSubmit } = useForm<IssueForm>()
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
				<Controller
					name='description'
					control={control}
					render={({ field }) => <SimpleMDE {...field} />}
				/>

				<Button>Submit new issue</Button>
			</form>
		</div>
	)
}

export default NewIssuesPage
