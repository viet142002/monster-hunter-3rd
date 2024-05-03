import { RegisterForm } from '@/components/auth';

function RegisterPage() {
    return (
        <>
            <h1>Đăng ký</h1>
            <section className='w-fit mx-auto'>
                <RegisterForm />
            </section>
        </>
    );
}

export default RegisterPage;
