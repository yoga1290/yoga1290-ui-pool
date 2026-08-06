import React, { ReactNode } from 'react';

import './style.scss';

export type LoginProp = {
    content?: string | ReactNode;
    show?: boolean;
    hideBackgroud?: boolean;
    onClose?: Function;
};


export default ( _props: LoginProp) => {


    return (
    <div className={`login-page`}>

        <main className="login-page">
            <div className="login-card">

            <div className="login-card__header">
                <h1>Welcome back</h1>
                <p>Please sign in to your account.</p>
            </div>

            {/* <!-- Social Logins --> */}
            <div className="social-auth">
                <button type="button" className="btn-social">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfaWlH2fNoDzLyGZ7iaQS-c3Ey7JDxvaZAktLMEbqPYH4NoiPSo_eNxcWoyCLFvgu5E8QArrEIynUWUIMEhgT11hwlEM1WnB1sAgkN9iA0MndB5f5K8SIPiul22aIy7PTLEdL6Td7hDHgG15H_hunOXpG0iB9MD8tJICP84Ur83Qhc4LL4hg3z1UQwcAhGeW96g1aS9Wck1Iy7OyCPjSZH1KJeIIyJEV5a5xNNa-0hEk6QaRTO_2Xi5Q"
                    alt="Google logo" />
                Continue with Google
                </button>
                <button type="button" className="btn-social">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRap0nvyNJYtBFxnozz6B9YirORjEfmuet8oJlXGx9mA_VtTeLiWtFxssiedt0cUodaCsmlPXUXZBaWIGwx17zrtFQawAAEgDp8qLC32HDFu2xulA6vJqZkz7tWC523STEDqStpCN8iygUS7gDB01JWaqRZ3-MWSlCNqSQLHLh2TRlAu9wABnXnzkyMUQ5HPLMd82m6iNyW4XbmO6e1nv_UMNkbevglNxaE-g_elQvfRG5OqdUpNNpXA"
                    alt="Facebook logo" />
                Continue with Facebook
                </button>
            </div>

            {/* <!-- Separator --> */}
            <div className="divider">
                <span className="divider__line"></span>
                <span className="divider__label">or sign in with email</span>
                <span className="divider__line"></span>
            </div>

            {/* <!-- Form --> */}
            <form className="login-form" noValidate>
                <div className="form-field">
                <label htmlFor={"email"}>Email Address</label>
                <input type="email" className="form-control" id="email" placeholder="name@company.com" />
                </div>

                <button type="submit" className="btn-sign-in">Sign In</button>
            </form>

            </div>
        </main>

    </div>);
};