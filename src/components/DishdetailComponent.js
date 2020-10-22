import React, {Component} from 'react';
import { Card, CardImg,  CardText, CardBody, CardTitle, CardHeader, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length ;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor (props){
        super(props);

        this.state ={
            isModalOpen: false
        };

        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        
    }
    
    toggleCommentModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleCommentSubmit (values){
        this.toggleCommentModal();
        console.log("Current State is: "+JSON.stringify(values))
        alert("Current State is: "+JSON.stringify(values))
    }


    render () {
        return (
            <div mt-0>
            <Button outline onClick={this.toggleCommentModal}>
                <span className="fa fa-pencil"></span> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleCommentModal}>
                <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=> this.handleCommentSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" name="rating" 
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                 </Control.select>
                            </Col>  
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name" 
                                        className="form-control"
                                        validators= {{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />  
                                        <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                     

                                </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>
                            Comment
                            </Label>
                            <Col md={12}>
                            <Control.textarea
                                model=".comment"
                                id="comment"
                                name="comment"
                                rows={5}
                                className="form-control"
                            />
                            </Col>
                    </Row>
                    <Button type="submit" value="submit" color="primary">
                        Submit
                    </Button>
                </LocalForm>
                </ModalBody>
            </Modal>
         </div>
        );
    }

        
}

    
   function  RenderDish ({dish}) { //User defined component always start with capital letter 
        if (dish != null)
        return(
            <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    else
     return(
            <div className="col-12 col-md-5 m-1"></div>
        );
    }
    function RenderComments({comments}) {
        if (comments != null) {
            const cmnts = comments.map((commnts) => {
                return (
                    <ul key={commnts.id} className="list-unstyled">
                        <li>
                            <p> {commnts.comment} </p>
                            <p> -- {commnts.author},
                                &nbsp;
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                                }).format(new Date(Date.parse(commnts.date)))}
                            </p>
                        </li>
                    </ul>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4> Comments </h4>
                    {cmnts}
                   <CommentForm  />
                </div>
                
             
               
            );  
        // if comments is empty     
        } else {
            return (
                <div></div>
            );
        }
        
    }

    
        

    const DishDetail= (props) =>{
        
        return (
            <div className="container">
                <div className="row">
					<Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
                <div className="row">
                     <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                    />
                </div>
            </div>
        );
    
    
}

export default DishDetail;