async function testAuth() {
    const signupData = {
        username: 'testuser' + Date.now(),
        email: 'test' + Date.now() + '@example.com',
        password: 'password123'
    };

    console.log('Testing Signup...');
    try {
        const signupRes = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signupData)
        });
        const signupJson = await signupRes.json();

        if (signupRes.ok) {
            console.log('Signup Successful:', signupJson.user);
        } else {
            console.error('Signup Failed:', signupJson);
            return;
        }

        console.log('Testing Login...');
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signupData.email,
                password: signupData.password
            })
        });
        const loginJson = await loginRes.json();

        if (loginRes.ok) {
            console.log('Login Successful:', loginJson.user);
            console.log('Token received:', loginJson.token.substring(0, 10) + '...');
        } else {
            console.error('Login Failed:', loginJson);
        }
    } catch (err) {
        console.error('Test Failed:', err.message);
    }
}

testAuth();
