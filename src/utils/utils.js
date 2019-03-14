export const makeRandomColor = () => ('#' + Math.floor(Math.random() * 16777215).toString(16))

export const makeRandomColorForString = income => {
    if (typeof income == 'string') {
        const pattern = new RegExp('[0-9a-fA-F]', 'g')

        const result = income.match(pattern)
            .filter(symbol => symbol !== ',')
            .slice(-6)
            .join('')

        return '#' + result
    } else {
        return 'black'
    }
}

export const toBytes = str => {
    let ch, st, re = []

    for (let i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i)
        st = []

        do {
            st.push(ch & 0xFF)
            ch = ch >> 8
        }
        while (ch)

        re = re.concat(st.reverse())
    }

    return re
}

export const fromUtf8 = str => Buffer.from(str, 'hex').toString('utf8')

export const toUtf8 = str => {
    const a = []
    for (let i = 0, enc = encodeURIComponent(str); i < enc.length;) {
        if (enc[i] === '%') {
            a.push(parseInt(enc.substr(i + 1, 2), 16))
            i += 3
        } else {
            a.push(enc.charCodeAt(i++))
        }
    }
    return a
}

export const includes = (array, search) => !!array ? array.indexOf(search) >= 0 : false

export const processString = options => {
    let key = 0

    const processInputWithRegex = (option, input) => {
        if (!option.fn || typeof option.fn !== 'function')
            return input

        if (!option.regex || !(option.regex instanceof RegExp))
            return input;

        if (typeof input === 'string') {
            let regex = option.regex
            let result = null
            let output = []

            while ((result = regex.exec(input)) !== null) {
                let index = result.index;
                let match = result[0]

                output.push(input.substring(0, index))
                output.push(option.fn(++key, result))

                input = input.substring(index + match.length, input.length + 1)
                regex.lastIndex = 0
            }

            output.push(input)
            return output
        } else if (Array.isArray(input)) {
            return input.map(chunk => processInputWithRegex(option, chunk))
        } else return input
    }

    return input => {
        if (!options || !Array.isArray(options) || !options.length) {
            return input
        }

        options.forEach(option => input = processInputWithRegex(option, input))

        return input
    }
}

// Aeca eSEBk t5GcB Cxwz1 F41Tv djX3d nKBkJ
// AUr5 QUfeB ADq6B MY6Tp 5yuMs UNGps D7nLZ
// AQvZ MDecM oCi2y 4V6QK dJBtH W1eV7 Vbaof
export const isAddress = address => /^[0-9a-zA-Z]{34}$/i.test(address)

export const isJSON = string => {
    let parsedStr = string
    try {
        parsedStr = JSON.parse(string)
    } catch (e) {
        return false
    }
    return typeof parsedStr == 'object'
}
