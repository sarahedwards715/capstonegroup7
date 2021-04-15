import React, { useEffect, useState } from 'react'
import { Button, Icon, Label, Form, Input, TextArea } from 'semantic-ui-react'
import { postReview } from '../../services/backendRequests'

function Reviews(props) {
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    

     useEffect(() => {
    //   if (like.length == 0 +1)
        
    





    }, [])
    return (
        <Form>
                        
          
            <Form.Field
                id='form-textarea-control-opinion'
                control={TextArea}
                label='Playlist Review'
                placeholder='Playlist Review'
            />
           
            <Form.Field
                id='form-button-control-public'

                control={Button}
                content='Confirm'
                label='Label with htmlFor'
            />


            <div className="reviewsWrapper">
                <Button as='Love' labelPosition='right'>
                    <Button
                        onClick="click"             
                        color='red'>
                        <Icon name='heart' />
        I love !
      </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        2,048
      </Label>

                </Button>
                <Button as='div' labelPosition='right'>
                    <Button basic color='blue'>
                        <Icon name='thumbs d' />
       Not a fan !
      </Button>
                    <Label as='Dislike' basic color='blue' pointing='left'>
                        2,048
      </Label>
                </Button>
                <Button onClick={(e) => postReview(e)}>Get Dummy Response</Button>
            </div>
        </Form>
    )
}

export default Reviews;
