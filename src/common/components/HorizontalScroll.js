import React,{Component} from 'react'

class HorizontalScroll extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={{width:'100%',overflowX:'auto'}}>
                {this.props.children}
            </div>
         );
    }
}
 
export default HorizontalScroll;