# Arrow Fx
## Typed FP for the masses

![inline](custom/images/arrow-brand-transparent.png)

---

## Who am I? #

[@raulraja](https://twitter.com/raulraja)
[@47deg](https://twitter.com/47deg)

- Co-Founder and CTO at 47 Degrees
- Typed FP advocate (regardless of language)

---

## Agenda

1. An introduction to Arrow
2. Choices Kotlin has made for it's user base
3. The Kotlin suspension system
4. Arrow Fx. A solution for building typed FP in Kotlin
5. Features for lang designers to consider based on industry FP devs experience.

---

## Arrow started as learning Exercise to learn FP in the spanish Android Community Slack

![inline](custom/images/ojetehandler.png)

---

## ...at the time it was called KΛTEGORY

![inline](custom/images/kategory.png)

---

## KΛTEGORY + Funktionale = Λrrow

### The name was cool but the community was more important

![inline](custom/images/arrow-brand-transparent.png)

---

## Type classes

### Λrrow contains includes the FP type classes

|                |                                                      |
|----------------|------------------------------------------------------|
| Error Handling | `ApplicativeError`, `MonadError`                      |
| Computation    | `Functor`, `Applicative`, `Monad`, `Bimonad`, `Comonad`                    |
| Folding        | `Foldable`, `Traverse`                          |
| Combining      | `Semigroup`, `SemigroupK`, `Monoid`, `MonoidK` |
| Effects        | `MonadDefer`, `Async`, `Effect`, `Concurrent`, `Bracket`           |
| Recursion      | `Recursive`, `BiRecursive`,...                                |
| MTL            | `FunctorFilter`, `MonadState`, `MonadReader`, `MonadWriter`, `MonadFilter`, ...                |

---

## Data types

Λrrow includes data types to cover general use cases.

|                |                                                      |
|----------------|------------------------------------------------------|
| Error Handling | `Option`,`Try`, `Validated`, `Either`, `Ior`         |
| Collections    | `ListK`, `SequenceK`, `MapK`, `SetK`             |
| RWS            | `Reader`, `Writer`, `State`                          |
| Transformers   | `ReaderT`, `WriterT`, `OptionT`, `StateT`, `EitherT` |
| Evaluation     | `Eval`, `Trampoline`, `Free`, `FunctionN`            |
| Effects        | `IO`, `Free`, `ObservableK`                         |
| Optics         | `Lens`, `Prism`, `Iso`,...                           |
| Recursion      | `Fix`, `Mu`, `Nu`,...                                |
| Others         | `Coproduct`, `Coreader`, `Const`, ...                |

---

## Kotlin TOP 5 features that help with FP

---

### 5. `?` Nullable Types

```kotlin
import arrow.*
val name: String? = null
val result = name.toUpperCase() //unsafe, won't compile

fun main() {
  println(name)
}
```
<!-- .element: class="arrow" theme="darcula" -->

---

### 5. `?` Nullable Types

```kotlin
//sampleStart
val name: String? = null
val result = name?.toUpperCase() //safe, short circuits
//sampleEnd
fun main() {
  println(name)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 5. `?` Nullable Types

#### Arrow enhances nullable types with the `Option` data type

```kotlin
import arrow.core.Option
//sampleStart
val name: Option<String> = None
val result = name.map { it.toUpperCase() } //safe, short circuits
//sampleEnd
fun main() {
  println(name)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 4. Data classes

```kotlin
//sampleStart
data class Person(val name: String, val age: Int)
val result = Person("John", 40)
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 4. Data classes

#### Auto hashcode + equals for the structure

```kotlin
//sampleStart
data class Person(val name: String, val age: Int)
val result = Person("John", 40) == Person("John", 40)
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 4. Data classes

#### Synthetic copy

```kotlin
//sampleStart
data class Person(val name: String, val age: Int)
val result = Person("John", 40).copy(name = "Jane")
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 4. Data classes

#### Arrow enhances data classes with `@product`

```kotlin
import arrow.core.*
import arrow.generic.*
//sampleStart
@product
data class Account(val balance: Int, val available: Int) {
  companion object
}

Account(1000, 900) + Account(1000, 900)
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 4. Data classes

#### Arrow enhances data classes with `@product`

```kotlin
import arrow.core.*
import arrow.generic.*
//sampleStart
@product
data class Account(val balance: Int, val available: Int) {
  companion object
}

val maybeBalance: Option<Int> = Option(1000)
val maybeAvailable: Option<Int> = Option(900)

val result =
  Option.applicative().run {
    mapToAccount(maybeBalance, maybeAvailable)
  }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 4. Data classes

#### Arrow enhances data classes with `@optics`

```kotlin
import arrow.optics.dsl.*
import arrow.optics.Optional

@optics data class Street(val number: Int, val name: String)
@optics data class Address(val city: String, val street: Street)
@optics data class Company(val name: String, val address: Address)
@optics data class Employee(val name: String, val company: Company?)

val john = Employee("John Doe", Company("Arrow", Address("Funtown", Street(42, "lambda street"))))
val optional: Optional<Employee, String> = Employee.company.address.street.name
val result = optional.modify(john, String::toUpperCase)

//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 3. Scoping functions

#### `run`, `with`

```kotlin
//sampleStart
data class Account(val balance: Int, val available: Int)

val result = Account(1000, 800).run { balance - available }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 3. Scoping functions

#### `run`, `with`

```kotlin
//sampleStart
data class Account(val balance: Int, val available: Int)

val result = with(Account(1000, 800)) { balance - available }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 3. Scoping functions

#### `run`, `with`

```kotlin
//sampleStart
fun <A, B> A.run(f: A.() -> B): B =
  f(this)

val result = "ΛRROW".run { "<${toLowerCase()}>" }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 2. Extension functions

#### Enhance any type with extensions

```kotlin
//sampleStart
data class Account(val balance: Int, val available: Int)

fun Iterable<Account>.total(): Int =
  fold(0) { acc, account ->
    acc + account.balance
  }

val result = listOf(Account(1000, 800), Account(2000, 1890)).total()
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 1. The Kotlin Suspension System

#### A pure function is just `fun`

```kotlin
//sampleStart
fun helloWorld(): String =
  "Hello World"

val result = helloWorld()
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 1. The Kotlin Suspension System

#### Is `printHelloWorld` a pure function?

```kotlin
//sampleStart
fun helloWorld(): String =
  "Hello World"

suspend fun printHelloWorld(): Unit =
  println(helloWorld())

val result = printHelloWorld()
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 1. The Kotlin Suspension System

#### Suspended functions can't compile or run in the pure environment! 🎉

```kotlin
//sampleStart
fun helloWorld(): String =
  "Hello World"

suspend fun printHelloWorld(): Unit =
  println(helloWorld())

val result = printHelloWorld()
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### 1. The Kotlin Suspension System

#### Scopes in which functions compile can be restricted a la carte

```kotlin
import kotlin.coroutines.RestrictsSuspension
//sampleStart
fun helloWorld(): String =
  "Hello World"

suspend fun printHelloWorld(): Unit =
  println(helloWorld())

suspend fun Restricted.printHelloWorld2(): Unit =
  println(helloWorld())

@RestrictsSuspension
class Restricted {
  suspend fun x(): Unit = printHelloWorld2() // works because in `Restricted` receiver
  suspend fun y(): Unit = printHelloWorld() // fails to compile
}

//sampleEnd
fun main() {
  println("")
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

## Arrow Fx

---

## Primitive ops

- `Fx` A block that delimits a concurrent cancelable continuation. `IO`
- `!` (bind, component1) Effect binding via implicit CPS

---

## Fx

### A continuation that controls and allows effects

```kotlin
//sampleStart
import arrow.effects.suspended.Fx

fun helloWorld(): String =
  "Hello World"

suspend fun printHelloWorld(): Unit =
  println(helloWorld())

val result: Fx<Unit> =
  Fx {
    printHelloWorld()
  }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

## Fx

### `Fx` blocks can be nested and unested via `!`

```kotlin
//sampleStart
import arrow.effects.suspended.Fx

fun helloWorld(): String =
  "Hello World"

val result: Fx<Unit> =
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

## Fx

### Running effects is unsafe. We make it explicit

```kotlin
//sampleStart
import arrow.unsafe
import arrow.effects.suspended.Fx
import arrow.effects.extensions.fx.unsafeRun.runBlocking

fun helloWorld(): String =
  "Hello World"

val result: Fx<Unit> =
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

## Fx

### unsafe is also a `@RestrictsSuspension` scope

```kotlin
//sampleStart
import arrow.unsafe
import arrow.effects.suspended.Fx
import arrow.effects.extensions.fx.unsafeRun.runBlocking

fun helloWorld(): String =
  "Hello World"

val result: Fx<Unit> =
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

## Fx

### When you have the ability to restrict compilation you can create architectural areas.

```kotlin
//sampleStart
import arrow.unsafe
import arrow.effects.suspended.Fx
import arrow.effects.extensions.fx.unsafeRun.runBlocking

fun helloWorld(): String =
  "Hello World"

val result: Fx<Unit> =
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---

### Arrow Fx is polymorphic

```kotlin
//sampleStart
import arrow.unsafe
import arrow.effects.suspended.Fx
import arrow.effects.extensions.fx.unsafeRun.runBlocking

fun helloWorld(): String =
  "Hello World"

val result: Fx<Unit> =
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" theme="darcula" -->

---
