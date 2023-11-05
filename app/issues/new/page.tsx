'use client'

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

function NewIssuesPage() {
	return (
		<div className='max-w-xl space-y-3'>
			<TextField.Root>
				<TextField.Input placeholder='Title' />
			</TextField.Root>
			<TextArea placeholder='Description' />
			<Button>Submit new issue</Button>
		</div>
	)
}

export default NewIssuesPage
