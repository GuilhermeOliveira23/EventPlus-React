import React from 'react';
import './VisionSection.css'
import Titulo from '../Titulo/Titulo';
const VisionSection = () => {
    return (
        <section className="vision">
            <div className="vision__box">
                <Titulo
                titleText={"Visão"}
                color='white'
                additionalClass='vision__title'
                />
                <p className='vision__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt libero voluptates unde, nemo dolore beatae. Quasi corrupti non praesentium ad deserunt adipisci facere, architecto nulla saepe iusto, ea reiciendis! Vitae!
                In repudiandae odit tenetur. Similique sunt tempora alias voluptates nemo et, pariatur asperiores assumenda numquam atque facere quaerat aliquam ab delectus voluptate esse suscipit accusamus. A optio quidem neque laborum.</p>
            </div>
        </section>
    );
};

export default VisionSection;