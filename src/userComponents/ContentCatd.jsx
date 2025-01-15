import React from 'react'

export default function ContentCatd( { imgSrc, number, backgroundColor, imgSize, title }) {
   
        return (
            <div
                className="payCard rounded-3 overflow-hidden border border-1 border-light p-3 mx-auto"
                style={{
                    backgroundColor: backgroundColor,
                    width: "100%",
                }}
            >
                <div className="img mb-3 d-flex justify-content-start">
                    <img src={imgSrc} alt="card-logo" style={{ width: imgSize }} />
                </div>
                <div className="" dir='ltr'>
                    <p className='ms-2'> {title}:</p>
                    <p className="text-white fw-bold text-center fs-3">{number}</p>
    
                </div>
            </div>
        );

}
