import React,{PureComponent} from 'react'
import style from './style.css'
import { Carousel } from 'antd';
const carouselImgs = [
    require('./banner_1.png'),
    require('./banner_2.png'),
    require('./banner_3.png'),
]
class Banner extends PureComponent{
    constructor(props){
        super(props);
    }
    renderCarousel = (imgs)=>{
        return imgs.map((item,index)=>
            <div key={index} className={style.carouselImgContainer}>
                <img src={item}/>
            </div>
        )
    }
    render(){
        return (
            <Carousel autoplay>
                {this.renderCarousel(carouselImgs)}
            </Carousel>
           );
    }


}

export default Banner
