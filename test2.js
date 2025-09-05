document.addEventListener("DOMContentLoaded", function () {
    const userIcon = document.getElementById("user-icon");
    const authModal = document.getElementById("auth-modal");
    const closeAuth = document.getElementById("close-auth");
    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    //open
    userIcon.addEventListener("click", () => {
        authModal.style.display = "flex";
    });

    // close 
    closeAuth.addEventListener("click", () => {
        authModal.style.display = "none";
    });

    // remove 
    loginTab.addEventListener("click", () => {
        loginTab.classList.add("active");
        signupTab.classList.remove("active");
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
    });

    signupTab.addEventListener("click", () => {
        signupTab.classList.add("active");
        loginTab.classList.remove("active");
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
    });

    // ✅ تسجيل حساب جديد
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = signupForm.querySelector("input[type='text']").value;
        const email = signupForm.querySelector("input[type='email']").value;
        const password = signupForm.querySelector("input[type='password']").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // تحقق هل البريد مستخدم
        if (users.find(u => u.email === email)) {
            alert("هذا البريد مسجل بالفعل!");
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("تم إنشاء الحساب بنجاح ✅ الآن يمكنك تسجيل الدخول");
        signupForm.reset();
    });

    // ✅ تسجيل الدخول
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = loginForm.querySelector("input[type='email']").value;
        const password = loginForm.querySelector("input[type='password']").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            alert("مرحباً " + user.name + " 👋");
            authModal.style.display = "none";
            document.getElementById("user-icon").innerHTML = `<span>👋 ${user.name}</span>`;
            localStorage.setItem("loggedInUser", JSON.stringify(user));
        } else {
            alert("بيانات غير صحيحة ❌");
        }
    });

    // ✅ تذكير المستخدم إذا مسجل دخول
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        document.getElementById("user-icon").innerHTML = `<span>👋 ${loggedInUser.name}</span>`;
    }
});
