import React, { useRef } from "react";
import "./Slide.scss";
import CatCard from "../catCard/CatCard";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import ProjectCard from "../projectCard/ProjectCard";

const Slide = ({ cards, type }) => {
    const scrollRef = useRef(null);
    
    
    const scroll = (direction) =>{
        const{ current } = scrollRef;
        const w = window.innerWidth;
        if(w<=720){
            if(direction==="left"){
                current.scrollLeft-=w;
            }else{
                current.scrollLeft+=w;
            }
        } else{
            if(direction==="left"){
                current.scrollLeft-=252*2;
            }else{
                current.scrollLeft+=252*2;
            }
        }
    };

    return (
        <div className="shell">
            <div className="slide">
                <div className="container" ref={scrollRef}>
                    {type==="cards" && 
                        <>
                            {cards.map((card) => (
                                <CatCard key={card.id} card={card} />
                            ))}
                        </>
                    }
                    {type==="projects" && 
                        <>
                            {cards.map((card) => (
                                <ProjectCard key={card.id} card={card} />
                            ))}
                        </>
                    }
                <div className="arrows">
                    <BsArrowLeftShort className="arrow-icon left" onClick={()=> scroll("left")} />
                    <BsArrowRightShort className="arrow-icon right" onClick={()=>scroll("right")} />
                </div>
                </div>
            </div>
        </div>
    )
}

export default Slide