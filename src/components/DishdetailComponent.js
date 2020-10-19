import React from 'react';
import { Card, CardImg,  CardText, CardBody, CardTitle, CardHeader } from 'reactstrap';


    
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


   function RenderComments({dish}) { 
        if (dish != null) {
            
            const coms = dish.comments.map((com) => {
                
                return (
                    <ul key={com.id} className='list-unstyled'>
                        <li>
                            
                            {com.comment}
                            
                        </li>
                        <li>
                            -- {com.author}, { }
                            <p>
                            { 
                                new Intl.DateTimeFormat('en-US', {
                                    month: 'short', day: '2-digit', year: 'numeric' 
                                }).format(new Date(Date.parse(com.date)))
                           
                            }
                            </p>
                        </li>
                    </ul>
                );
            });
            
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                       
                        <CardHeader><h4>Comments</h4></CardHeader>
                    
                        <CardBody>
                            <CardText>
                                <ul>
                                    {coms}
                                </ul>
                            </CardText>
                        </CardBody>
                    </Card>
                 </div>
                   
            );

        } else {
            return (
                <div className="col-12  col-md-5  m-1"></div>
            );
        }
    }

    const DishDetail= (props) =>{
        
        return (
            <div className="container">
                <div className="row">
                <RenderDish dish={props.dish}/>
                <RenderComments dish={props.dish}/>
                </div>
            </div>
        );
    
    
}

export default DishDetail;