import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formRef = document.querySelector('form');

formRef.addEventListener('submit', creatMessage);

function creatMessage(event) {
  event.preventDefault();
  const promise = createPromise(formRef.elements.delay.value);
  promise
    .then(delay => {
    iziToast.show({
      message: `✅ Fulfilled promise in ${delay}ms`,
      color: 'green',
      position: 'topRight',
      timeout: 5000,
    })
    })
    .catch(delay => {
    iziToast.show({
      message: `❌ Rejected promise in ${delay}ms`,
      color: 'red',
      position: 'topRight',
      timeout: 5000,
    })
    })

    formRef.elements.delay.value = "";

}

function createPromise(delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formRef.elements.state.value === 'fulfilled') {
        resolve(delay)
      }else if (formRef.elements.state.value === 'rejected') {
        reject(delay)
      }
    }, delay);
  });
    
  return promise;
}