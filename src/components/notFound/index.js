import React,{Component} from 'react'
import Img from './404.png'
import styles from './style.css'
import style from '../../lib/animate.css'
export default class NotFound extends Component{
    constructor(props){
        super(props);
        this.state = {
            animationType:'swing'
        };
    }
componentDidMount(){
    // alert(2)
}

    render(){
        return(
            <div className={styles.container}>
                <img src={Img} className={`${style.animated} ${style[this.state.animationType]}`} />
            </div>
        )
    }
}
