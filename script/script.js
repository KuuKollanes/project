document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const prevButton = document.querySelector('#prev');
    const nextButton = document.querySelector('#next');
    const sendButton = document.querySelector('#send');

    let myVar = 2;

    switch (true) {
        case myVar === 1:
        case myVar === 2:
            console.log('myVar < 3');
            break;
        case myVar === 3:
            console.log('myVar === 3');
            break;
        default:
            console.log('Ни один из вариантов');
    }


    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    URL: './image/burger.png'
                },
                {
                    title: 'Черный',
                    URL: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    URL: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    URL: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    URL: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    URL: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    URL: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    URL: './image/salad.png'
                },
                {
                    title: 'Лук',
                    URL: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    URL: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    URL: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    URL: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ]


    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block')
    })

    const playTest = () => {
        const finalAnswers = [];
        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answers) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answerItem.innerHTML =
                    `<input type="${questions[index].type}" id="${answers.title}" name="answer" class="d-none" value = "${answers.title}">
                    <label for="${answers.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answers.URL}" alt="burger">
                    <span>${answers.title}</span>
                    </label>
                `;

                formAnswers.appendChild(answerItem);
            })
        }

        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
            }


            switch (true) {

                case numberQuestion === 0: {
                    prevButton.classList.add('d-none');
                    nextButton.classList.remove('d-none');
                    nextButton.classList.remove('d-none');

                    break;
                }

                case numberQuestion === 1: {
                    prevButton.classList.remove('d-none');
                    break;
                }

                case numberQuestion === questions.length: {
                    prevButton.classList.add('d-none');
                    nextButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    formAnswers.innerHTML = `<div calss = "form-group">
                    <label for="numberPhone">Enter your number</label>
                    <input type="phone" class = "form-control" id ="numberPhone"
                    </div>`;
                    break;
                }

                case numberQuestion === questions.length + 1: {
                    sendButton.classList.add('d-none');
                    questionTitle.textContent = `Тест окончен`;
                    formAnswers.textContent = "Спасибо!"
                    setTimeout(() => {
                        modalBlock.classList.remove('d-block');
                    }, 2000)
                    break;
                }
            }
        }
        renderQuestions(numberQuestion);

        const checAnswer = () => {
            const obj = {};

            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone')

            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }
                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value
                }

                finalAnswers.push(obj);
            });
        }

        nextButton.onclick = () => {
            checAnswer()
            numberQuestion++;
            renderQuestions(numberQuestion);
        }

        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        }

        sendButton.onclick = () => {
            checAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
            console.log(finalAnswers);
        }
    }

})