import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker"
import ErrorMessage from '../Messages/ErrorMessage'
import SuccessMessage from '../Messages/SuccessMessage'
import Fetcher from '../../helpers/Fetcher'
import "react-datepicker/dist/react-datepicker.css"
import PageHeader from './PageHeader'

const NewProgram = ({ setAuthStatus }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const addProgram = async (event) => {
        event.preventDefault()
        setErrorMessage(null)
        setSuccessMessage(null)

        try {
            const form = event.target
            await Fetcher.post('programs', new FormData(form))
            setSuccessMessage('Program successfully created')
            
            setStartDate('')
            setEndDate('')
            form.reset()
        } catch (error) {
            setErrorMessage(error.message || 'Some error')
        }
    }

    return (
        <Form onSubmit={addProgram}>
            <PageHeader title='New Program' setAuthStatus={setAuthStatus}/>

            <Form.Field>
                <label>Title</label>
                <input placeholder='Title' name='title'/>
            </Form.Field>
            
            <Form.TextArea label='Description' placeholder='Description' name='description' />

            <Form.Group>
                <Form.Field>
                    <DatePicker
                        autoComplete='off'
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM dd, yyyy HH:mm"
                        name='startDate'
                    />
                </Form.Field>
                
                <span>_</span>

                <Form.Field>
                    <DatePicker
                        autoComplete='off'
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM dd, yyyy HH:mm"
                        name='endDate'
                    />
                </Form.Field>
            </Form.Group>

            <Form.Field>
                <label>Categories</label>
                <input placeholder='Categories' name='categories'/>
            </Form.Field>

            <ErrorMessage message={errorMessage}/>
            <SuccessMessage message={successMessage}/>

            <Button type='submit' color='blue'>Add Program</Button>
            
            <p>
                <a href='/programs'>Back to the list</a>
            </p>
        </Form>
    )
}
    

export default NewProgram
