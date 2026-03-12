document.addEventListener('DOMContentLoaded', () => {
    // Set min date to today on all date inputs
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(el => el.min = today);

    // Auto-update check-out min when check-in changes
    const ci = document.getElementById('check_in');
    const co = document.getElementById('check_out');
    if (ci && co) {
        ci.addEventListener('change', () => {
            const next = new Date(ci.value);
            next.setDate(next.getDate() + 1);
            co.min = next.toISOString().split('T')[0];
        });
    }
});
