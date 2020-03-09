## 1.1.3

- Add TypeScript type declarations in `index.d.ts`

## 1.1.2

- Re-type outerStyle from `mixed` to `any` (until RN style types API stabilises)

## 1.1.1

- Loosen return type of `onPress`

## 1.1.0

- Add an `all` prop for more concisely/explicitly setting both platforms to the same effect.
- Improve Flow types.

## 1.0.2

- Just resorted to `mixed` for `outerStyle` Flow type, as the last attempt was still insufficient to cover everything which RN allows.

## 1.0.1

- Expanded Flow allowed types for `outerStyle`

## 1.0.0

First public release, with formalized API.
