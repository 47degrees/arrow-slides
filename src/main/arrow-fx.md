## Who am I?

- [@raulraja](https://twitter.com/raulraja), Co-Founder and CTO [@47deg](https://twitter.com/47deg)
- Typed FP advocate (for all languages)

---

#### What is a pure function?

A function that is deterministic. Given the same input produces the same output without observable world changing effects.

---

#### What is a pure function?

Is this pure or impure?

```kotlin
//sampleStart
fun printHelloWorld(): Unit =
  println("Hello World!")

val result = printHelloWorld()
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### What is a pure function?

Is this pure or impure?

```kotlin:ank
import arrow.effects.IO
//sampleStart
fun printHelloWorld(): IO<Unit> =
  IO { println("Hello World!") }

val result = printHelloWorld()
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### What is a pure function?

Is this pure or impure?

```kotlin
import arrow.effects.IO
//sampleStart
suspend fun printHelloWorld(): Unit =
  println("Hello World!")

val result = printHelloWorld()
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### The suspended future

---

Suspended functions require a continuation

```diff
- suspend fun printHelloWorld(): Unit
+ fun printHelloWorld(callback: Continuation<Unit>): Unit
```
<!-- .element: class="arrow" data-executable="false" -->

```kotlin
interface Continuation<in A> {
  val context: CoroutineContext
  fun resumeWith(result: Result<A>)
}
```
<!-- .element: class="arrow" data-executable="false" -->

---

`@RestrictSuspension` 

```kotlin
import kotlin.coroutines.RestrictsSuspension
//sampleStart
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
```
<!-- .element: class="arrow" data-executable="false" -->

---

#### `suspend fun` + ΛRROW

![Arrow FX](css/images/arrow-fx-brand.png)

---

#### ΛRROW Fx

- A purely functional effects library for Kotlin built on ΛRROW and the Kotlin Coroutines System.
- Emphasis in empowering simple and declarative effectful programming for everyone.

---

#### Fx DSL

|        |        |
|--------|--------|
| __fx__ | A block that delimits a concurrent cancelable continuation |
| __effect__ | Turn and effect into a pure value |
| __!__ | Binds a pure value into the continuation context |
| __unsafe__ | Unsafe perform effects |

---

#### __fx__

A block that delimits a concurrent cancelable continuation

```kotlin
import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
//sampleStart
suspend fun printHelloWorld(): Unit =
  println("Hello world")

val result: IO<Unit> =
  fx {
    printHelloWorld() //lacks explicit `effect` control. Won't compile
  }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### __effect__

Turn and effect into a pure value

```kotlin:ank:silent
import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
import arrow.unsafe
import arrow.effects.extensions.io.unsafeRun.runBlocking
//sampleStart
suspend fun printHelloWorld(): Unit =
  println("Hello world")

val result =
  fx {
    effect { printHelloWorld() }
  }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### __!__

Binds a pure value into the continuation context

```kotlin:ank:silent
import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
//sampleStart
suspend fun printHelloWorld(): Unit =
  println("Hello World")

val result: IO<Unit> =
  fx {
    val result: Unit = !effect { printHelloWorld() }
    result
  }

fun main() {
  println(result)
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### __Arrow Fx__ 

`!` Removes `ALL` callbacks

```kotlin:diff
- service1().flatMap { result1 ->
-   service2(result1).flatMap { result2 ->
-     service3(result2).map { result3 ->
-        Result(result3)
-     }
-   }
- }
+ val result1 = !service1()
+ val result2 = !service2(result1)
+ val result3 = !service3(result2)
+ Result(result3)
```
<!-- .element: class="arrow" data-executable="false" -->

---

#### __unsafe__

Perform effects at the edge of the world

```kotlin:ank:silent
import arrow.unsafe
import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
//sampleStart
import arrow.effects.extensions.io.unsafeRun.runBlocking

//sampleStart
val result: IO<Unit> =
  fx {
    !effect { println("Hello World") }
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### __Polymorphism__ 

Just make things parametric to `Fx<F>`

```kotlin:ank:silent
import arrow.Kind
import arrow.unsafe
import arrow.effects.IO
import arrow.effects.typeclasses.UnsafeRun
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.unsafeRun
import arrow.effects.extensions.io.fx.fx
//sampleStart
fun <F> Fx<F>.program(): Kind<F, Unit> =
  fx {
    !effect { println("HelloWorld") }
  }

fun <F> UnsafeRun<F>.main(fa: Kind<F, Unit>): Unit =
  unsafe { runBlocking { fa } }

fun main() {
  IO.unsafeRun().main(IO.fx().program())
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" -->

[//]: <> (Jorge)

---

#### __Asynchronous fibers__

Easy to spawn and manage

```kotlin:ank:silent
import arrow.unsafe
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.runBlocking
import arrow.effects.extensions.io.fx.fx
fun main() {
unsafe {
  runBlocking {
//sampleStart
fx {
  val op = effect { Thread.currentThread().name }
  val fiber = !NonBlocking.startFiber(op)
  val threadName: String = !fiber.join()
  !effect { println(threadName) }
}
//sampleEnd
  }
}
}
```
<!-- .element: class="arrow" data-executable="true" -->

---


#### __Asynchronous fibers__

Recovering from async errors 

```kotlin:ank:silent
import arrow.unsafe
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.runBlocking
import arrow.effects.extensions.io.fx.fx
fun main() {
unsafe {
  runBlocking {
//sampleStart
fx {
  val op = effect { throw RuntimeException("BOOM!") }
  val fiber = !NonBlocking.startFiber(op)
  val recovery = { error: Throwable -> 
    effect { println("recovering from async exception") } 
  }
  !fiber.join().handleErrorWith(recovery)
}
//sampleEnd
  }
}
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### Concurrency

Races

```kotlin:ank:silent
import arrow.unsafe
import arrow.core.Tuple3
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.runBlocking
import arrow.effects.extensions.io.fx.fx
fun main() {
unsafe {
  runBlocking {
//sampleStart
fx {
  val op1 = effect { Thread.currentThread().name }
  val op2 = effect { Thread.currentThread().name }
  val op3 = effect { Thread.currentThread().name }
  val result = !NonBlocking.raceN(op1, op2, op3)
  !effect { println(result) }
}
//sampleEnd
  }
}
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### Concurrency

Direct style concurrent non blocking map

```kotlin:ank:silent
import arrow.unsafe
import arrow.core.Tuple3
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.runBlocking
import arrow.effects.extensions.io.fx.fx
fun main() {
unsafe {
  runBlocking {
//sampleStart
fx {
  val op1 = effect { Thread.currentThread().name }
  val op2 = effect { Thread.currentThread().name }
  val op3 = effect { Thread.currentThread().name }
  val (threadA, threadB, threadC) = !NonBlocking.parMapN(op1, op2, op3, ::Tuple3)
  !effect { println(listOf(threadA, threadB, threadC)) }
}
//sampleEnd
  }
}
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### Switching execution contexts

Imperative context switch with `continueOn`

```kotlin:ank:silent
import arrow.unsafe
import arrow.core.Tuple3
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.runBlocking
import arrow.effects.extensions.io.fx.fx
import kotlinx.coroutines.asCoroutineDispatcher
import java.util.concurrent.Executors
import kotlin.coroutines.EmptyCoroutineContext
import kotlinx.coroutines.newSingleThreadContext

//sampleStart
val BlockingIO = newSingleThreadContext("I/O")
val UI = newSingleThreadContext("UI")
val program = fx {
  continueOn(NonBlocking)
  val t1 = !effect { Thread.currentThread().name }
  continueOn(BlockingIO)
  val t2 = !effect { Thread.currentThread().name }
  continueOn(UI)
  val t3 = !effect { Thread.currentThread().name }
  !effect { println("$t1 ~> $t2 ~> $t3") }
}
//sampleEnd
fun main() {
unsafe {
  runBlocking {
    program
  }
}
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### Safe resource acquisition

`bracketCase`

```kotlin:ank:silent
import arrow.unsafe
import arrow.core.Tuple3
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.runBlocking
import arrow.effects.extensions.io.fx.fx
import arrow.effects.typeclasses.ExitCase

class File(url: String) {
  fun open(): File = this
  fun close(): Unit {}
  override fun toString(): String = "This file contains some interesting content!"
}

//sampleStart
val program = fx {
  val acquire = effect { File("data.json").open() }
  val use = { file: File -> effect { println(file.toString()) } }
  val release = { file: File, exitCase: ExitCase<*> ->
    effect { 
      when (exitCase) {
        is ExitCase.Completed -> println("completed") 
        is ExitCase.Canceled -> println("canceled") 
        is ExitCase.Error -> println("error") 
      }
      file.close()
      println("File closed")
    }
  }
  !acquire.bracketCase(release, use)
}
//sampleEnd
fun main() {
unsafe {
  runBlocking {
    program
  }
}
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### Fx FOR ALL Monads

*Fx over `Option`*

```kotlin:ank:silent
import arrow.core.Option
import arrow.core.extensions.option.fx.fx
fun main() {
  println(
//sampleStart
fx {
  val one = !Option(1)
  val two = !Option(one + one)
  two
}
//sampleEnd
)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

*Fx over `Eval`*

```kotlin:ank:silent
import arrow.core.Eval
import arrow.core.extensions.eval.fx.fx
fun main() {
  println(
//sampleStart
fx {
  val one = !Eval.now(1)
  val two = !Eval.later { one + one }
  two
}
//sampleEnd
)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

*Fx over `Eval`*

```kotlin:ank:silent
import arrow.core.Right
import arrow.core.extensions.either.fx.fx
fun main() {
  println(
//sampleStart
fx<String, Int> {
  val one = !Right(1)
  val two = !Right(one + one)
  two
}
//sampleEnd
)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

#### We support different binding styles

*explicit `bind()`*
```kotlin:ank:silent
import arrow.core.Option
import arrow.core.extensions.option.fx.fx
fun main() {
  println(
//sampleStart
fx {
  val one = Option(1).bind()
  val two = Option(one + one).bind()
  two
}
//sampleEnd
)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

## Thanks!

### Thanks to everyone that makes ΛRROW possible!

![47 Degrees](css/images/47deg-logo.png)  ![Kotlin](css/images/kotlin.png)
