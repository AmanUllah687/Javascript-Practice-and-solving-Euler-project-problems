function lexicographicPermutation(n) {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let index = n - 1; // Convert to 0-based index
    let result = '';

    // Precompute factorials: fact[i] = i!
    const fact = [1];
    for (let i = 1; i <= 9; i++) {
        fact[i] = fact[i - 1] * i;
    }

    for (let i = 9; i >= 0; i--) {
        // Which digit in the remaining list?
        const digitIndex = Math.floor(index / fact[i]);
        result += digits[digitIndex];

        // Remove used digit
        digits.splice(digitIndex, 1);

        // Update index for next position
        index %= fact[i];
    }

    return result;
}

console.log(lexicographicPermutation(1000000)); // 2783915460