import React from 'react';
import { Card, CardImg,  CardText, CardBody, CardTitle, CardHeader, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    
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
                    <RenderComments comments={props.comments}/>
                </div>
            </div>
        );
    
    
}

export default DishDetail;