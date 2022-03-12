import { useState, useEffect, useRef  } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import easa from '../assets/EASA-.jpg';

import regal from '../assets/regal-beloit-logo-png-transparent.png';
import baldor from '../assets/baldor.png';
import weg from '../assets/weg.png';

export const QuoteForm = ({ parts, setParts }) => {

  const [data, setData] = useState({name: '', email: '', company: '', message: '', parts: [], file: '', mailSent: false})

  useEffect(() => {
    setData({...data, parts: [...parts]})
  },[parts])

  // Email js
  const form = useRef();

  // Submit form
  const onSubmit = async (e) => {
    
    e.preventDefault()

    console.log(data.file)

    if (!data.name) {
      alert('Please add a name')
      return
    } else if (!data.name.split(' ').join('').match(/^[a-zA-Z]*$/)) {
      alert('Only letters')
      return
    }

    if (!data.email) {
      alert('Please add a email')
      return
    } else if (data.email){
        let lastAtPos = data.email.lastIndexOf("@")
        let lastDotPos = data.email.lastIndexOf(".")
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            data.email.indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            data.email.length - lastDotPos > 2
          )
        ) {
          alert('Email is not valid')
        }
    }

    if (!data.company) {
      alert('Please add a company')
      return
    }

    if (!data.message) {
      alert('Please add a message')
      return
    }

    setData({...data, parts: parts})

    if (data.parts.length === 0) {
      alert('Please select the parts')
      return
    }

    //EmailJS function
    sendEmail(e)
      
    alert('Message sent. Thank You.')
    setData({name: '', email: '', company: '', message: '', parts: [], file: '', mailSent: false})
  }

  // File Up-upload
  function onFileChange(e) {
    let files = e.target.files;
    if(files[0].size > 2097152){
      alert('Please upload up to 2mb image.')
      return
    }
    //let fileReader = new FileReader();
    console.log(files[0]);
    setData({...data, file: files[0]});
  }

  //EmailJS function
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kt6k2qv', 'template_ap5sznp', form.current, 'user_gITlE5kyklllEkKNjkWmu')
      .then((result) => {
        console.log(result.text);
        window.location.replace('http://www.woltersmotors.com/');
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <>
      <style type="text/css">
        {`
        .btn-wolter1 {
          background-color: #29a28b;
          color: white;
        }
        .btn-wolter1:hover {
          background-color: #04427d;
          color: white;
        }
        `}
      </style>
      <Form ref={form} onSubmit={onSubmit} style={{backgroundColor: '#04348d', padding: '20px', color: '#fff'}}>
        <h5>Request a Quote</h5>
        <Form.Group className='mb-3' controlId='nameForm'>
          <Form.Control type='text' placeholder='Name' name='name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='emailForm'>
          <Form.Control type='email' placeholder='Email' name='email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='companyForm'>
          <Form.Control type='text' placeholder='Company Name' name='company' value={data.company} onChange={(e) => setData({...data, company: e.target.value})} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='messageForm'>
          <Form.Control as='textarea' placeholder='Message' name='message' rows={3} value={data.message} onChange={(e) => setData({...data, message: e.target.value})} />
        </Form.Group>
        <Form.Group className="pictureForm" controlId="formFile">
          <Form.Control type="file" name='file' accept="image/png, image/jpeg" onChange={(e) => onFileChange(e)} />
        </Form.Group>
        <Form.Label column>Selected Parts</Form.Label>
        <ListGroup>
          {parts.map((item) => {
            return (<ListGroup.Item key={item+'a'}>
              {item} <button className='remove-item' onClick={() => {
                const removedItem = parts.filter((subItem) => item !== subItem)
                setParts(removedItem)
              }
              }>X</button>
            </ListGroup.Item>)
          })}
        </ListGroup>
        <Form.Group className='mb-3' controlId='nameParts' style={{display: 'none'}}>
          <Form.Control type='text' placeholder='Parts' name='parts' value={parts} onChange={(e) => e.target.value = parts} />
        </Form.Group>
        <Button variant='wolter1' type='submit' style={{marginTop:'15px'}}>
          Request Your Quote
        </Button>
      </Form>
      <div style={{textAlign: 'center'}}>
        <p>
          <img  
            src={easa}  
            alt='EASA Logo'
            width='220px' 
          />
        </p>
        <p>
          <img  
            src={regal}  
            alt='Regal Logo'
            width='250px' 
          />
        </p>
        <p>
          <img  
            src={baldor}  
            alt='Baldor Logo'
            width='220px'
          />
        </p>
        <p>
          <img  
            src={weg}  
            alt='WEG Logo' 
          />
        </p>
      </div>
    </>
  )
}