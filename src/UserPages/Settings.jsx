import React from 'react'

function Settings() {
    return (
        <section>
            <div className="container py-4">
                <div className="row g-4 mt-5">

                    <div className="col-md-4 col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title d-flex align-items-center">
                                    تغيير كلمه المرور
                                </h5>
                                <p className="card-text text-muted">
                                    Create shared inboxes for teammates to work together.
                                </p>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">كلمه المرور</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">تاكيد كلمه المرور</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button type="submit" className="btn btn-primary">حفظ</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-8">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title d-flex align-items-center">
                                    بيانات الملف الشخصي
                                </h5>
                                <p className="card-text text-muted">
                                    Create rules for where messages go and who they’re assigned to.
                                </p>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Enter your username" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button type="submit" className="btn btn-primary">حفظ</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>


    )
}

export default Settings