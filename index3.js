const { Observable, of, range, from, fromEvent, fromPromise, interval, timer, merge, zip, combineLatest} = rxjs;
const { map, filter, buffer, skip, take, skipUntil, takeUntil, delay,
        skipWhile, takeWhile, distinctUntilChanged, mergeAll, concatAll, concatMap } = rxjs.operators;

const s1 = interval(900).pipe(map(x => 'Stream 1: ' + x));
const s2 = interval(500).pipe(map(x => 'Stream 2: ' + x));
            
merge(s1, s2)
    .pipe(take(8))
    .subscribe(subscription('merge'));
                
range(1, 2)
    .pipe(map(x => range(1, 3)), mergeAll())
    .subscribe(subscription('mergeAll'));

range(1, 3)
    .pipe(map(x => range(x, 3)), concatAll())
    .subscribe(subscription('concatAll'));

range(1, 3)
    .pipe(concatMap((x, i) => {
        return interval(100)
            .pipe(take(x), map(q => i))
    }))
    .subscribe(subscription('concatMap'))

const z1 = of('Hi');
const z2 = of('Igor');
const z3 = of('!').pipe(delay(15000));

zip(z1, z2, z3)
    .subscribe(subscription('zip'));

const t1 = timer(1000, 2000);
const t2 = timer(2000, 2000);
const t3 = timer(3000, 2000);
const t4 = timer(4000, 2000);
    
combineLatest(t1, t2, t3, t4)
    .pipe(take(10))
    .subscribe(subscription('combineLatest'));

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


    
    
