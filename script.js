document.addEventListener('DOMContentLoaded', () => {
    // State Management
    const state = {
        currentScreen: 'screen-register',
        user: {
            userId: 'MDLNWD16818',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            shopName: '',
            state: '',
            district: '',
            address: '',
            pincode: '',
            dob: '',
            pan: '',
            fee: '1999'
        },
        transaction: {
            phone: '',
            amount: 0,
            status: 'SUCCESS'
        }
    };

    // DOM Elements Mapping
    const screens = {
        register: document.getElementById('screen-register'),
        envSetup: document.getElementById('screen-env-setup'),
        pairing: document.getElementById('screen-pairing'),
        services: document.getElementById('screen-services'),
        matmMenu: document.getElementById('screen-matm-menu'),
        withdrawalForm: document.getElementById('screen-withdrawal-form'),
        hardwareStep: document.getElementById('screen-hardware-step'),
        result: document.getElementById('screen-result')
    };

    // Global Overlay & Highlights
    const overlay = document.getElementById('tutorial-overlay');

    // Navigation function
    const navigateTo = (screenId) => {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        const current = document.getElementById(screenId);
        if (current) {
            current.classList.add('active');
            state.currentScreen = screenId;
            window.scrollTo(0, 0);
        }
    };

    // 1. Step: Registration Form Submission
    document.getElementById('form-register').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Capture User Data
        state.user.firstName = document.getElementById('reg-firstname').value;
        state.user.lastName = document.getElementById('reg-lastname').value;
        state.user.email = document.getElementById('reg-email').value;
        state.user.phone = document.getElementById('reg-phone').value;
        state.user.shopName = document.getElementById('reg-shopname').value;
        state.user.state = document.getElementById('reg-state').value;
        state.user.district = document.getElementById('reg-district').value;
        state.user.address = document.getElementById('reg-address').value;
        state.user.pincode = document.getElementById('reg-pincode').value;
        state.user.dob = document.getElementById('reg-dob').value;
        state.user.pan = document.getElementById('reg-pan').value;
        state.user.fee = document.querySelector('input[name="reg-fee"]:checked').value;

        // Update greeting in dashboard if element exists
        const displayNameElement = document.getElementById('display-name');
        if (displayNameElement) {
            displayNameElement.textContent = state.user.firstName || 'Dileep';
        }
        
        navigateTo('screen-env-setup');
    });

    // 2. Step: Driver & Environment Setup
    document.getElementById('btn-driver-installed').addEventListener('click', () => {
        const btSteps = document.getElementById('bt-steps');
        btSteps.classList.remove('hidden');
        document.getElementById('btn-driver-installed').parentElement.classList.add('hidden');
    });

    let pcBtOn = false;
    let matmBtOn = false;

    document.getElementById('btn-bt-pc-ok').addEventListener('click', (e) => {
        pcBtOn = true;
        e.target.classList.replace('btn-outline', 'btn-blue');
        e.target.innerHTML = '<i class="fas fa-check"></i> PC Bluetooth On';
        checkSetupReady();
    });

    document.getElementById('btn-bt-matm-ok').addEventListener('click', (e) => {
        matmBtOn = true;
        e.target.classList.replace('btn-outline', 'btn-blue');
        e.target.innerHTML = '<i class="fas fa-check"></i> MATM Bluetooth On';
        checkSetupReady();
    });

    const checkSetupReady = () => {
        if (pcBtOn && matmBtOn) {
            document.getElementById('btn-env-done').classList.remove('hidden');
        }
    };

    document.getElementById('btn-env-done').addEventListener('click', () => {
        navigateTo('screen-pairing');
        
        // Simulate pairing delay
        setTimeout(() => {
            const pairingSuccess = document.getElementById('pairing-success');
            pairingSuccess.classList.remove('hidden');
            
            setTimeout(() => {
                navigateTo('screen-services');
                startTutorialSequence('target-matm-service');
            }, 2000);
        }, 3000);
    });

    // 3. Step: Services Dashboard Tutorial
    const startTutorialSequence = (targetId) => {
        const target = document.getElementById(targetId);
        if (target) {
            overlay.style.display = 'block';
            target.classList.add('highlight-target');
        }
    };

    const clearTutorialSequence = (targetId) => {
        const target = document.getElementById(targetId);
        if (target) {
            overlay.style.display = 'none';
            target.classList.remove('highlight-target');
        }
    };

    document.getElementById('target-matm-service').addEventListener('click', () => {
        clearTutorialSequence('target-matm-service');
        navigateTo('screen-matm-menu');
        startTutorialSequence('target-withdrawal');
    });

    // 4. Step: MATM Menu
    document.getElementById('target-withdrawal').addEventListener('click', () => {
        clearTutorialSequence('target-withdrawal');
        navigateTo('screen-withdrawal-form');
    });

    // 5. Step: Withdrawal Form
    document.getElementById('form-withdrawal').addEventListener('submit', (e) => {
        e.preventDefault();
        state.transaction.phone = document.getElementById('wd-phone').value;
        state.transaction.amount = document.getElementById('wd-amount').value;
        
        navigateTo('screen-hardware-step');
        runHardwareInteractions();
    });

    // 6. Step: Hardware Interaction Simulation
    const runHardwareInteractions = () => {
        const cardAni = document.getElementById('card-ani');
        const mainText = document.getElementById('hw-main-text');
        const subText = document.getElementById('hw-sub-text');
        
        // Wait for device setup
        setTimeout(() => {
            subText.textContent = "MATM Device Ready. Insert your card.";
            
            setTimeout(() => {
                cardAni.classList.remove('hidden');
                cardAni.style.top = "180px"; // Simulates inserting into device
                mainText.textContent = "Card Inserted!";
                subText.textContent = "Reading chip data... Please do not remove card.";
                
                setTimeout(() => {
                    document.getElementById('pin-pad').classList.remove('hidden');
                    document.getElementById('hw-step-text').classList.add('hidden');
                }, 2000);
            }, 1000);
        }, 1000);
    };

    document.getElementById('btn-pin-done').addEventListener('click', () => {
        navigateTo('screen-result');
        processFinalResult();
    });

    // 7. Step: Results & Receipt Data Injection
    const processFinalResult = () => {
        const resultAnimation = document.getElementById('result-animation');
        const isSuccess = Math.random() > 0.05; // 95% success rate for demo
        state.transaction.status = isSuccess ? 'SUCCESS' : 'FAILURE';

        // Result Icon
        if (isSuccess) {
            resultAnimation.innerHTML = '<i class="fas fa-check-circle" style="color: #27ae60;"></i><h2 class="mt-md" style="color: #27ae60;">Transaction Successful!</h2>';
        } else {
            resultAnimation.innerHTML = '<i class="fas fa-times-circle" style="color: #e74c3c;"></i><h2 class="mt-md" style="color: #e74c3c;">Transaction Failed!</h2>';
        }

        // Receipt Details
        document.getElementById('r-userid').textContent = state.user.userId;
        document.getElementById('r-shop').textContent = (state.user.shopName || 'Maddox Digital').toUpperCase();
        document.getElementById('r-date').textContent = new Date().toLocaleString().split(',')[0].replace(/\//g, '-');
        document.getElementById('r-phone').textContent = state.transaction.phone.replace(/(\d{4})\d+(\d{2})/, '$1xxxx$2');
        document.getElementById('r-amount').textContent = parseFloat(state.transaction.amount).toFixed(2);
        document.getElementById('r-status').textContent = state.transaction.status;
        document.getElementById('r-status').style.color = isSuccess ? '#27ae60' : '#e74c3c';
    };

    // 8. Restart / Restart Flow
    document.getElementById('btn-restart').addEventListener('click', () => {
        navigateTo('screen-services');
        // Reset dynamic elements
        document.getElementById('wd-phone').value = '';
        document.getElementById('wd-amount').value = '';
        document.getElementById('card-ani').classList.add('hidden');
        document.getElementById('card-ani').style.top = "120px";
        document.getElementById('pin-pad').classList.add('hidden');
        document.getElementById('hw-step-text').classList.remove('hidden');
        document.getElementById('hw-main-text').textContent = "Please Insert Card";
        document.getElementById('hw-sub-text').textContent = "Waiting for device communication...";
    });

    // Ensure only the active screen is shown initially (though CSS handles it)
    navigateTo('screen-register');
});
