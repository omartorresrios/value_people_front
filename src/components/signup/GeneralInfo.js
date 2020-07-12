import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as CloseButton } from '../../images/closeButton.svg';

class GeneralInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      professions: '',
      interests: '',
      description: '',
      image: '',
      isUserRegistered: false
    };
    this.onChange = this.onChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.seeInterests = this.seeInterests.bind(this);
  }

  componentWillMount() {
    var interests = this.props.location.state.interests.map((interest) => {
      return interest.name
    });

    this.setState({email: this.props.location.state.email,
                   first_name: this.props.location.state.first_name,
                   last_name: this.props.location.state.last_name,
                   professions: this.props.location.state.professions,
                   interests: interests})
  }

  registerUser() {

    let isAllInputsFilled = this.state.first_name &&
                            this.state.last_name &&
                            this.state.email &&
                            this.state.professions &&
                            this.state.interests &&
                            this.state.description &&
                            this.state.image
    if (isAllInputsFilled) {
      let json = {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          description: this.state.description,
          all_professions: this.state.professions,
          all_interests: this.state.interests
      }

      console.log("json sended: " + JSON.stringify(json));

      axios.post("http://localhost:3000/api/users/signup", {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        avatar: this.state.avatar,
        email: this.state.email,
        description: this.state.description,
        all_professions: this.state.professions,
        all_interests: this.state.interests.join(",")
      }).then(response => {
        console.log("Citizen created!: " + JSON.stringify(response.data));
        this.setState({isUserRegistered: true});
        // this.updateStatesAndValues();

        // let data1 = JSON.parse(sessionStorage.getItem("userData"));
        // let name = JSON.stringify(data.data.data.attributes.name);
        // console.log("checking the current user: " + name);
      })
      .catch((error) => {
        console.log('Cant save the review in the server because: ' + error);
      });
    } else {
      console.log("fill al the fields");
    }
  }

  seeInterests() {
    // console.log("this.state.image: " + this.state.image);
    // console.log("this.state.first_name: " + this.state.first_name);
    // console.log("this.state.last_name: " + this.state.last_name);
    // console.log("this.state.email: " + this.state.email);
    // console.log("this.state.description: " + this.state.description);
    // console.log("this.state.professions: " + this.state.professions);
    // console.log("this.state.interests: " + JSON.stringify(this.state.interests));
    // const interests = this.state.interests.filter(interest => interest.name)
    // let interests = this.state.interests.filter((interest) => {
    //     return interest.name;
    //
    //   }
    // );
    // console.log("inside: " + JSON.stringify(interests));

    // var interests = this.state.interests.map((interest) => {
    //   return interest.name
    // });
    console.log("interests!!: " + this.state.interests)
    console.log("professions!!: " + this.state.professions)
    var withComma = this.state.interests.join(", ");
    console.log("with comma: " + withComma);
    // console.log("interests that will be sended: ", + JSON.stringify(interests));
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
    let files = e.target.files;
    console.log("files: " + JSON.stringify(files));

    if (files && files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      console.log("inside!: " + e.target.result);



      const file = e.target.files[0];
      const fileType = file['type'];
      const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (validImageTypes.includes(fileType)) {
        console.log("The file is valid!");

        // hiding button for upload file
        document.getElementById('photoButton').style.display = 'none';

        // showing img that contains the file and button to change image
        document.getElementById('changeImage').style.display = 'inherit';
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(file);
        output.style.display = 'inherit';

        reader.onload=(e)=> {
          URL.revokeObjectURL(output.src)
        //   // console.warn("image data: ", e.target.result);
        //
        //   // const formData = {avatar: e.target.result}
        //   // console.log("formData: " + JSON.stringify(formData));
          this.setState({image: e.target.result})
        //   console.log("the final fucking image: " + this.state.image);
          }
        // }

      } else {
        console.log("The file is not valid. Upload an image please.");
      }

    }

    const fd = new FormData();
    fd.append('image', this.state.image)

    for (var key of fd.entries()) {
        console.log('veamos: ' + key[0] + ', ' + key[1]);
    }

    console.log("the image is?: " + this.state.image);
  }

  uploadPhoto() {
    document.getElementById("selectImage").click()
  }

  changePhoto() {
    document.getElementById('output').removeAttribute('src');
    document.getElementById("selectImage").click()
  }

  render() {
    if (this.state.isUserRegistered) {
      return (<Redirect to={{ pathname: '/registration/confirmation', state: { first_name: this.state.first_name,
                                                                               last_name: this.state.last_name,
                                                                               email: this.state.email,
                                                                               professions: this.state.professions,
                                                                               interests: this.state.interests.filter(interest => interest.isSelected === true),
                                                                               description: this.state.description,
                                                                               image: this.state.image}}} />)
    }

    return (
      <div class="container">
        <div class="row">
          <div class="six columns">
            <label for="exampleEmailInput">Descripción</label>
            <input type="text" name="description" placeholder="Descríbete brevemente" onChange={this.onChange}/>
          </div>
        </div>
        <div className="AD_parent_body_firstchild_content_photo_container">
          <button id='photoButton' onClick={this.uploadPhoto} className="AD_parent_body_firstchild_content_photo">Foto</button>
          <input id='selectImage' hidden type="file" onChange={this.onChange}/>
          <div className="current_image_container">
            <div className="current_image_container_div" onClick={this.changePhoto}>
              <CloseButton id='changeImage' className="current_image_container_svg" />
            </div>
              <img id="output" className="current_image_container_image"/>
            </div>
        </div>
        <div class="row">
          <div class="six columns">
            <input type="submit" value="Registrar" class="button-primary" onClick={this.registerUser}/>
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <input type="submit" value="Ver intereses" class="button-primary" onClick={this.seeInterests}/>
          </div>
        </div>
      </div>
    );
  }
}

export default GeneralInfo;
