import { createContext, useRef, useState } from 'react'
import './App.css'
import FontControlBox from './components/FontControlBox'
import Footer from './components/Footer'
import Form from './components/Form'
import Modal from './components/Modal'

export const initialFormData = {
    id: '',
    pw: '',
    confirmPw: '',
}

export const FormContext = createContext({
    formState: initialFormData,
    setFormData: () => {},
})

function App() {
    const [formData, setFormData] = useState(initialFormData)
    const modalRef = useRef(null)

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            <section className="form-wrapper">
                <Form modalRef={modalRef} />
                <Footer />
            </section>
            <FontControlBox />
            <Modal ref={modalRef} />
        </FormContext.Provider>
    )
}

export default App
