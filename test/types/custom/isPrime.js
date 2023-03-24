export function isPrime(x) {
    if (x <= 1) {
        return false;
    }

    const sq = Math.sqrt(x);

    for (let i = 2; i < sq; i++) {
        if (x % i === 0) {
            return false;
        }
    }

    return true;
}

export function isPrimeAndBetween(x, userArguments, min, max) {
    const ok = isPrime(x);

    if (ok) {
        if (x < min || x > max) {
            return false;
        }
    } else {
        return false;
    }

    return true;
}

export function isPrimeAndBetweenViaInput(x, userArguments) {
    return isPrimeAndBetween(x, null, userArguments[1], userArguments[2]);
}

export function isPrimeAndBetweenViaOptionsInput(x, userArguments) {
    return isPrimeAndBetween(x, null, userArguments[0].min, userArguments[0].max);
}
