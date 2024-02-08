import { Component } from "react";
import ErrorMesage from "../errorMessage/UserErrorMessage";
class ErrorBoundary extends Component{
    state={
error:false
    }

  

    componentDidCatch(error,info){
        console.log(error, info);
        this.setState({
            error:true
        })
    }

    render(){
        if(this.state.error ){
            return (
                <ErrorMesage/>
            )
        }
      return this.props.children;
    }
}
export default ErrorBoundary;