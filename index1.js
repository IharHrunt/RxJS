const { Observable, from, fromEvent } = rxjs;
const { map, filter, buffer, skip, take, distinct, debounceTime, delay } = rxjs.operators;


let stream = Observable.create((observer) => {    
    observer.next('next one');
    setTimeout(() => observer.error('something wrong'), 5000);
    setTimeout(() => observer.next('4 sec'), 4000);
    //setTimeout(() => observer.complete(), 6000);
    setTimeout(() => observer.next('2 sec'), 2000);
    observer.next('next two');
});

stream.subscribe(
    (data) => console.log('subscribe', data),
    (error) => console.log('error', error),
    () => console.log('completed')
);

// fromEvent()
const h3 = document.getElementById('h3');
fromEvent(document, 'mousemove')
    .subscribe(e =>  h3.innerHTML = `X: ${e.clientX}, Y: ${e.clientY}`);

fromEvent(document.getElementById('btn1'), 'click')
    .subscribe(e => console.log(e));;

fromEvent(document.getElementById('txt1'), 'keyup')
    .pipe(map(e => e.target.value), distinct())
    .subscribe(subscription('distinct()'));

fromEvent(document.getElementById('txt2'), 'keyup')
    .pipe(map(e => e.target.value), debounceTime(1500))    
    .subscribe(subscription('debounceTime()'));

function subscription(name) {
    return {
        next(x) {            
            console.log(name, ': ', x);
        },
        error(err) {
            console.log('error: ', x);
        },
        complete() {
            console.log(name, ' completed');
        }
    }
}

const names = [
    {id: 1, name: 'Ihar'}, 
    {id: 2,  name: 'Alla'}, 
    {id: 3, name: 'Karina'}, 
    {id: 4, name: 'Kirill'}
];    

fromEvent(document.getElementById('txt3'), 'keyup')
    .pipe(map(e => e.target.value))    
    .subscribe(x => {        
        from(names)
            .pipe(filter(n => n.id.toString() === x), delay(1000))
            
            .subscribe(p => {
                document.getElementById('div1')       
                .innerHTML = `<p>id: ${p.id}, name: ${p.name}</p>`;                
            })
    });    


