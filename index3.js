const { of, range, from, fromEvent, fromPromise, interval, timer, merge } = rxjs;
const { map, filter, buffer, skip, take, skipUntil, takeUntil, 
        skipWhile, takeWhile, distinctUntilChanged, mergeAll, concatAll, concatMap } = rxjs.operators;


const s1 = interval(900).pipe(map(x => 'Stream 1: ' + x));
const s2 = interval(500).pipe(map(x => 'Stream 2: ' + x));
            
merge(s1, s2)
    .pipe(take(8))
    .subscribe(subscription('merge'));
                
range(1, 2) // 1, 2, 3
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


    
    
