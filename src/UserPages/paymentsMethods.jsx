import React, { useEffect, useState } from 'react'
import vodafone from '../../public/Vodafone-Logo-Vector.jpg'
import orange from '../../public/orange.png'
import Etisalat from '../../public/vectorseek.com-Etisalat New Logo Vector.svg'
import we from '../../public/we.png'
import { Link } from 'react-router-dom'
import {  GetWalletsNumber } from '../Services/userApiService'
import { toast } from 'react-toastify'
import ContentCatd from '../userComponents/ContentCatd'


export default function PaymentsMethods() {
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
            <div className="container my-5">
                <div className="row mt-5">
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <ContentCatd
                            imgSrc={vodafone}
                            backgroundColor="rgb(255, 1, 1)"
                            number={nums?.vodavoneNum}
                            imgSize="60px"
                            title="Vodafone Cash"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <ContentCatd
                            imgSrc={orange}
                            backgroundColor="rgb(255, 102, 0)"
                            number={nums?.orangeNum}
                            imgSize="85px"
                            title="Orange Cash"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <ContentCatd
                            imgSrc={Etisalat}
                            backgroundColor="rgb(0, 0, 0)"
                            number={nums?.etisalatNum}
                            imgSize="60px"
                            title="Etisalat Cash"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <ContentCatd
                            imgSrc={we}
                            backgroundColor="rgb(91, 47, 145)"
                            number={nums?.weNum}
                            imgSize="100px"
                            title="We Cash"
                        />
                    </div>
                </div>
            </div>
            <div className="m-4 p-4 rounded-2 bg-dark text-light border border-secondary  shadow-lg">
                <h5 className=" mb-4">طريقة الاشتراك في الدورة التدريبية</h5>
                <ul className="list-unstyled">
                    <li className="mb-3">
                        <span className="fw-bold fs-5 ms-2">1. اختر طريقة الدفع المناسبة:</span>
                        أرسل مبلغ الاشتراك إلى الرقم المعروض الخاص بالمحفظة التي تفضلها.
                    </li>
                    <li className="mb-3">
                        <span className="fw-bold fs-5 ms-2">2. احفظ إيصال الدفع:</span>
                        قم بالتقاط صورة واضحة لإيصال الدفع أو تأكيد المعاملة.
                    </li>
                    <li className="mb-3">
                        <span className="fw-bold fs-5 ms-2">3. تواصل مع فريق خدمة العملاء:</span>
                        <Link to="/customer-service" className="text-decoration-underline text-info">اذهب إلى صفحة خدمة العملاء</Link>
                        وشارك صورة الإيصال مع فريق الدعم لتأكيد اشتراكك.
                    </li>
                    <li>
                        <span className="fw-bold fs-5 ms-2">4. انتظر تأكيد الاشتراك:</span>
                        سيتم التواصل معك من قِبل الإدارة لإتمام اشتراكك وتفعيل الوصول إلى الدورة التدريبية.
                    </li>
                </ul>
            </div>
        </section>

    );
}




