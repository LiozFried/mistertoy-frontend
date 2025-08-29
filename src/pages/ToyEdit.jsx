import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/actions/toy.action"
import { useSelector } from "react-redux"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ToySchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Toy name must be at least 3 characters long')
        .max(50, 'Toy name cannot be more then 50 characters')
        .required('Required'),
    price: Yup.number()
        .min(5, 'Minimum price is $5')
        .required('Required')
        .typeError('Must be a number'),
    labels: Yup.array()
        .min(1, 'You must choose at least one label')
        .max(4, 'You can choose maximum of 4 labels')
        .required('Required'),
    inStock: Yup.boolean()
})

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const labels = useSelector(storeState => storeState.toyModule.toyLabels)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        if (!toyId) {
            setToyToEdit(toyService.getEmptyToy())
            return
        }
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Cannot edit toy', err)
                navigate('/toy')
                showErrorMsg('Cannot edit toy')
            })
    }

    //Handle Change for old form:
    // function handleChange({ target }) {
    //     const { name, value, type, checked } = target
    //     let fieldValue = value
    //     if (type === 'checkbox') {
    //         fieldValue = checked
    //     } else if (type === 'number') {
    //         fieldValue = +value
    //     } else if (type === 'select-multiple') {
    //         fieldValue = [...target.selectedOptions].map(option => option.value)
    //     }

    //     setToyToEdit(prevToy => ({ ...prevToy, [name]: fieldValue }))
    // }

    function onSaveToy(value) {
        saveToy(value)
            .then((savedToy) => {
                showSuccessMsg(`Toy ${savedToy._id} saved`)
                navigate('/toy')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot save toy')
            })
    }

    if (!toyToEdit) return <div>Loading...</div>

    return (
        <section className="toy-edit">
            <h1>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h1>
            <Formik
                initialValues={toyToEdit}
                validationSchema={ToySchema}
                onSubmit={onSaveToy}
                enableReinitialize={true}
            >
                {({ value }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <Field type="text" id="name" name="name" />
                            <ErrorMessage name="name" component="div" className="error-msg" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <Field type="number" id="price" name="price" />
                            <ErrorMessage name="price" component="div" className="error-msg" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="labels">Labels:</label>
                            <Field as="select" multiple id="labels" name="labels" >
                                {labels.map(label => (
                                    <option key={label} value={label}>
                                        {label}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="labels" component="div" className="error-msg" />
                        </div>

                        {toyToEdit._id && (
                            <div className="form-group">
                                <label htmlFor="inStock">In Stock:</label>
                                <Field type="checkbox" id="inStock" name="inStock"/>
                            </div>
                        )}

                        <button type="submit">{toyToEdit._id ? 'Update Toy' : 'Add'}</button>
                    </Form>
                )}
            </Formik>

        </section>
    )
}