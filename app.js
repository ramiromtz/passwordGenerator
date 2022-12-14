const lengthSlider = document.querySelector(".pass-length input"),
generateBtn = document.querySelector(".generate-btn"),
lengthValue = document.getElementById("length-value"),
passwordInput = document.querySelector(".input-box input"),
copyIcon = document.querySelector(".input-box span"),
passIndicator = document.querySelector(".pass-indicator")
options = document.querySelectorAll(".options input");

const characters = { //* objects of letters, numbers and symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&.|[](){}:;.,_-*+#@<>~"
}

const updateSlider = () => {
    //* passing slider value
    lengthValue.innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    passLength = lengthSlider.value,
    excludeDuplicate = false;

    options.forEach(option => { 
        if (option.checked) { //* If checkbox is checked
            if (option.id !== "exc_duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id]
            } else if(option.id === "spaces") {
                staticPassword += ` ${staticPassword} `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar
        }
    }
    
    passwordInput.value = randomPassword; //* Passing random pass to input
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = 'check';
    setTimeout(() => {
        copyIcon.innerText = 'copy_all';
    },1500)
}

lengthSlider.addEventListener("input", updateSlider);
copyIcon.addEventListener("click", copyPassword);
generateBtn.addEventListener("click", generatePassword);