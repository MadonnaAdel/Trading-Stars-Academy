import React, { useEffect } from 'react'
import ContentCatd from '../userComponents/ContentCatd'
import whatsapp from '../../public/whatsApp.svg'
import telegram from '../../public/telegra.jpeg'
import { useState } from 'react'
import { GetWalletsNumber } from '../Services/userApiService'
export default function ContactUs() {
    const [nums, setNums] = useState([])
    const getNumbers = async () => {
        try {
            const res = await GetWalletsNumber(1);
            if (res?.data?.isPass) {
                setNums(res.data.data);
            } else {
                toast.info(res?.data?.message);
            }
        }
        catch (err) {
            toast.error(err)
            console.error(err);
        }
    }
    useEffect(() => {
        getNumbers()
    }, [nums])

    return (
        <section className="pt-5">
            <h3 className="m-5 text-center">
                تواصل معنا عبر الارقام الاتية
            </h3>
            <div className="container my-5">
                <div className="row mt-5">
                    <div className="col-12 col-md-6 col-lg-6 mb-4">
                        <a href={`https://wa.me/2${nums?.whatsAppNum}?text=مرحبا%20أريد%20التواصل`} target="_blank" className='text-decoration-none text-white'>
                            <ContentCatd
                                imgSrc={whatsapp}
                                backgroundColor="linear-gradient(1deg, #045522, #4fd858)"
                                number={nums?.whatsAppNum}
                                imgSize="86px"
                                title="Whatsapp Number"
                            />
                        </a>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 mb-4">
                        <a href={`https://telegram.me/+2${nums?.telegramNum}`} target="_blank" className='text-decoration-none text-white'>
                            <ContentCatd
                                imgSrc={telegram}
                                backgroundColor="rgb(1 166 230)"
                                number={nums?.telegramNum}
                                imgSize="85px"
                                title="Telegram Number"
                            />
                        </a>

                    </div>

                </div>
            </div>
        </section>
    )
}
