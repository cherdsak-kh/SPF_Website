document.getElementById('rule_2').classList.add('d-none')

document.getElementById('rule_1_btn').onclick = () => {
    document.getElementById('rule_1_btn').classList.add('active')
    document.getElementById('rule_2_btn').classList.remove('active')
    document.getElementById('rule_1').classList.remove('d-none')
    document.getElementById('rule_2').classList.add('d-none')
}

document.getElementById('rule_2_btn').onclick = () => {
    document.getElementById('rule_2_btn').classList.add('active')
    document.getElementById('rule_1_btn').classList.remove('active')
    document.getElementById('rule_2').classList.remove('d-none')
    document.getElementById('rule_1').classList.add('d-none')
}