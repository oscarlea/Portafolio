class ContactForm {
    constructor(form) {
      this.form = form;
      this.nameInput = form.querySelector('#contacto__nombre');
      this.emailInput = form.querySelector('#contacto__email');
      this.subjectInput = form.querySelector('#contacto__asunto');
      this.messageInput = form.querySelector('#contacto__mensaje');
      this.submitButton = form.querySelector('#contacto__boton');
      this.addListeners();
    }
      
  addListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.nameInput.addEventListener('input', this.handleInput.bind(this));
    this.nameInput.addEventListener('blur', this.handleInput.bind(this));
    this.emailInput.addEventListener('input', this.handleInput.bind(this));
    this.emailInput.addEventListener('blur', this.handleInput.bind(this));
    this.subjectInput.addEventListener('input', this.handleInput.bind(this));
    this.subjectInput.addEventListener('blur', this.handleInput.bind(this));
    this.messageInput.addEventListener('input', this.handleInput.bind(this));
    this.messageInput.addEventListener('blur', this.handleInput.bind(this));
  }

  handleSubmit(event) {
    /* event.preventDefault(); */
    const name = this.nameInput.value.trim();
    const email = this.emailInput.value.trim();
    const subject = this.subjectInput.value.trim();
    const message = this.messageInput.value.trim();
    console.log(`Nombre: ${name}`);
    console.log(`Correo electrónico: ${email}`);
    console.log(`Asunto: ${subject}`);
    console.log(`Mensaje: ${message}`);
    event.target.reset();
    this.submitButton.disabled = true;
  }

  handleInput(event) {
   const input = event.target;
    if (input.validity.valid) {
      input.classList.remove('error');
      input.setCustomValidity('');
    } else {
      input.classList.add('error');
      this.showErrorMessage(input);
    }
    this.toggleSubmitButton();
  }

  showErrorMessage(input) {
    const validityState = input.validity;
    for (let key in validityState) { 
      console.log(`${key}: ${validityState[key]}`); 
    } 

    let message = '';
    if (input.validity.valueMissing) {
      message = 'Campo no debe estar en blanco o vacío';
    } else if (input.validity.typeMismatch) {
      message = 'El correo electrónico debe tener el formato usuario@dominio.com';
    } else if (input.validity.tooLong) {
      message = `Este campo debe contener máximo ${input.getAttribute('maxlength')} caracteres`;
    } else if (input.validity.patternMismatch) {
      message = 'Solo se permiten letras del alfabeto A-Z (mayúsculas o minúsculas) y espacios en el campo nombre.';
    }
 
    input.setCustomValidity(message);
    input.reportValidity();
  }

  toggleSubmitButton() {
    const inputs = [this.nameInput, this.emailInput, this.subjectInput, this.messageInput];
    const isFormValid = inputs.every(input => input.checkValidity());
    this.submitButton.disabled = !isFormValid;
  }
}

const contactForm = new ContactForm(document.querySelector('#contacto__form'));