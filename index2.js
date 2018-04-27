const { of, range, from, fromEvent, fromPromise, interval, timer } = rxjs;
const { map, filter, buffer, skip, take, skipUntil, takeUntil, skipWhile, takeWhile, distinctUntilChanged } = rxjs.operators;


// of(), range()
of(1, 2, 3, 4 , 5, 6, 7, 8, 9, 10)
    .pipe(map(x => x + 10), skip(2), take(3))
    .subscribe(subscription('of()'));

range(1, 20)
    .pipe(filter(x => x % 2 === 1), map(x => x + x))
    .subscribe(subscription('range()'));


// from()
from(new Map([[1, 20], [3, 40], [5, 6]]))    
    .subscribe(subscription('from(Map)'));

from(new Set([1001, 1002, 1003, 'string 4', 'string 5', {id: 6}]))    
    .pipe(filter( x => {
        if (typeof x === 'number') {
            return x * x;
        }
    }), skip(2), take(1))
.subscribe(subscription('from(Set)'));

function delay(ms = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
}    

// delay(3000).then(() => console.log('Resolved!'));

from(delay(2222))
    .subscribe(subscription('fromPromise()'));

from([1, 2, 3, 3, 3, 5, 5, 1, 1, 99, 99, 2, 4, 6])
    .pipe(distinctUntilChanged())
    .subscribe(subscription('from(distinctUntilChanged)'));


// interval(), timer()
interval(500)
    .pipe(skip(5), take(5))
    .subscribe(subscription('interval()'));

interval(500)
    .pipe(skipWhile(x => x < 5), takeWhile(x => x < 13))
    .subscribe(subscription('skipWhile()'));

interval(500)
    .pipe(skipUntil(timer(3000)), takeUntil(timer(5000)))
    .subscribe(subscription('skipUntil()'));

interval(1000)
    .pipe(buffer(fromEvent(document, 'click')), map(x => x.length))
    .subscribe(subscription('buffer()'));    

timer(2000, 500)
    .pipe(skip(10), take(4))
    .subscribe(subscription('timer()'));
    
function subscription(name) {
    return {
        next(x) {
            //x += 100;
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


    
    
