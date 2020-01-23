import React, { Component } from 'react'
import ApiService from '../../../services/api-service'
import config from '../../../config'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import ImageUploader from 'react-images-upload'
import CircularProgress from '@material-ui/core/CircularProgress';

class Account extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            user: [],
            edit: false,
            files: [],
            loading: false
        }
    }

    setUser = user => {
        this.setState({
            user
        })
    }

    setEdit = bool => {
        this.setState({
            edit: bool
        })
    }

    fileSelectedHandler = (file) => {
        this.setState({
            files: [...file]
        })
    }

    removeImage = (file, index) => {
        let newPics = this.state.files
        newPics.splice(index, 1);
        this.setState({
            files: [...newPics]
        })
    }

    componentDidMount(){
        const id = sessionStorage.getItem('id')
        ApiService.getDataHalf(`${config.API_ENDPOINT}/users/${id}`)
            .then(data => {
                this.setUser(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    editUserInformation = e => {
        e.preventDefault()
        this.setState({ loading: true })
        let formData = new FormData()

        const updatedUser = {
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            email: e.target.email.value,
            country: e.target.country.value,
            phone: e.target.phone.value,
            birthday: e.target.birthday.value
        }

        for (const key in updatedUser) {
            if (updatedUser[key] !== '' || undefined)
                formData.append(`user[${key}]`, updatedUser[key])
        }
        formData.append('user[photo]', this.state.files[0])


        fetch(`${config.API_ENDPOINT}/users/${this.state.user.id}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`
            }
            })
            .then(res => {
                if(!res.ok)
                    return res.json().then(error => Promise.reject(error))
                return res
            })
            .then(data => {
                this.setEdit(false)
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

  
    render(){
        const user = this.state.user
        return (
            <div className="contact-container">
                <div className='header-grid'>
                    <h1>Account Settings</h1>
                    {(!this.state.edit)
                    ? <EditIcon 
                        className="user-icon"
                        onClick={() => this.setEdit(true)}
                    />
                    : <CloseIcon 
                        className="user-icon"
                        onClick={() => this.setEdit(false)}
                    />
                    }
                </div>
                {(!this.state.edit)
                ? <div className="user">
                    <img src={user.photo_url} alt="profile" className="profile-img" />
                    <div className="user-info">
                        <h3>{`${user.firstname} ${user.lastname}`}</h3>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Country of Residence: {user.country}</p>
                        <p>Birthday: {user.birthday}</p>
                    </div>
                </div>
                : <form onSubmit={(e) => {this.editUserInformation(e)}}>
                    <div className="inner-form-content">
                        <div className="form-content-section">
                            <h3>Update Profile Picture</h3>
                            <div className="user">
                            {(this.state.user.photo_url)
                            ? <img src={user.photo_url} alt="profile" className="profile-img" />
                            : null
                            }
                            <ImageUploader
                                withIcon={true}
                                buttonText='Upload Profile Picture'
                                onChange={(e) => this.fileSelectedHandler(e)}
                                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                                maxFileSize={5242880}
                                name="file"
                                className="image-uploader"
                                label="Max file size: 5mb | accepted: jpg, gif, png, jpeg"
                            />
                            </div>
                            <div className="images-container">
                                    {(this.state.files) 
                                    ? this.state.files.map((file, i) => {
                                        return (
                                            <div 
                                                key={i}
                                                className="thumbnail-container"
                                            >
                                                <CloseIcon 
                                                    onClick={() => this.removeImage(file, i)}
                                                    className="close-image"
                                                    fontSize="small"
                                                />
                                                <img 
                                                    width={100}
                                                    src={file.id ? file.url : URL.createObjectURL(file)} 
                                                    alt="thumbnail"
                                                />
                                                <p>{file.name}</p>
                                            </div>
                                        )
                                    })
                                    : null
                                    }
                                    </div>
                        </div>
                        <div className="form-content-section">
                            <h3>Update User Information</h3>
                            <div className="form-group row">
                                <div>
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" name="firstname" id="firstname" defaultValue={user.firstname}/>
                                </div>
                                <div>
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" name="lastname" id="lastname" defaultValue={user.lastname}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" defaultValue={user.email}/>
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone</label>
                                    <input type="number" name="phone" id="phone" defaultValue={user.phone}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div>
                                    <label htmlFor="country">Country of Residence</label>
                                    <input type="text" name="country" id="country" defaultValue={user.country}/>
                                </div>
                                <div>
                                    <label htmlFor="birthday">Birthday</label>
                                    <input type="date" name="birthday" id="birthday" defaultValue={user.birthday}/>
                                </div>
                            </div>
                        </div>
                        {(this.state.loading)
                        ? <div className="loading-property">
                            <CircularProgress />
                        </div>
                        : <input className="submit" type="submit" value="Update" />
                    }
                    </div>
                </form>
                }
            </div>
        )
    }
}

export default Account;