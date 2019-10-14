# Who are we?

- [@vergauwen_simon](https://twitter.com/vergauwen_simon), Senior Software Engineer [@47deg](https://twitter.com/47deg)
- [@raulraja](https://twitter.com/raulraja), Co-Founder and CTO [@47deg](https://twitter.com/47deg)

---

## What is a pure function?

A function that is deterministic. Given the same input produces the same output without observable world changing effects.


---

<video controls>
   <source src="../css/videos/arrow-meta_1.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>


---

<video controls>
   <source src="../css/videos/arrow-meta_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>


---

<video controls>
   <source src="../css/videos/arrow-meta_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>


---

<video controls>
   <source src="../css/videos/arrow-meta_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>


---

<video controls>
   <source src="../css/videos/arrow-meta_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>


---

<video controls>
   <source src="../css/videos/arrow-meta_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>


---



## What is a pure function?

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

## What is a pure function?

Is this pure or impure?

```kotlin

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

## What is a pure function?

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

## The suspended future

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

## `suspend fun` + ΛRROW

![Arrow FX](css/images/logo-arrow-meta.svg)

---

## ΛRROW Fx

- A purely functional effects library for Kotlin built on ΛRROW and the Kotlin Coroutines System.
- Emphasis in empowering simple and declarative effectful programming for everyone.

---

### Fx DSL

|        |        |
|--------|--------|
| __fx__ | A block that delimits a concurrent cancelable continuation |
| __effect__ | Turn and effect into a pure value |
| __!__ | Binds a pure value into the continuation context |
| __unsafe__ | Unsafe perform effects |

---

### __fx__

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

### __effect__

Turn and effect into a pure value

```kotlin

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

### __!__

Binds a pure value into the continuation context

```kotlin

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

### __Arrow Fx__ 

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

### __unsafe__

Perform effects at the edge of the world

```kotlin

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

### __Polymorphism__ 

Just make things parametric to `Fx<F>`

```kotlin

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

### __Asynchronous fibers__

Easy to spawn and manage

```kotlin

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


### __Asynchronous fibers__

Recovering from async errors 

```kotlin

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

### Concurrency

Races

```kotlin

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

### Concurrency

Direct style concurrent non blocking map

```kotlin

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

### Switching execution contexts

Imperative context switch with `continueOn`

```kotlin

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

### Safe resource acquisition

`bracketCase`

```kotlin

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

### Fx FOR ALL Monads

*Fx over `Option`*

```kotlin

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

```kotlin

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

*Fx over `Either`*

```kotlin

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

### We support different binding styles

*explicit `bind()`*
```kotlin

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

### Arrow Fx Vs Kotlinx Coroutines

Kotlinx Coroutines default builders are **eager**

```kotlin

import kotlinx.coroutines.*
fun main() {

//sampleStart
GlobalScope.launch(Dispatchers.Default) {
  println(Thread.currentThread().name) 
}
//sampleEnd
runBlocking {
  delay(100)  
}

}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### Arrow Fx Vs Kotlinx Coroutines

Kotlinx Coroutines can be made lazy explicitly

```kotlin

import kotlinx.coroutines.*
fun main() {

//sampleStart
val job = GlobalScope.launch(Dispatchers.Default, start = CoroutineStart.LAZY) {
  println(Thread.currentThread().name) 
}
//sampleEnd
println(job)

}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### Arrow Fx Vs Kotlinx Coroutines

Coroutines scopes wait for their child jobs to finish

```kotlin

import kotlinx.coroutines.*
fun main() {

//sampleStart
runBlocking { // <- coroutines scopes wait for their child jobs to finish
  //nobody starts the job below and it's lazy
  async(Dispatchers.Default, CoroutineStart.LAZY) {} 
} //endless loop
//sampleEnd

}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### Arrow Fx Vs Kotlinx Coroutines

Arrow Fx is Lazy and always yields pure programs

```kotlin

import arrow.effects.extensions.io.fx.fx
fun main() {
  println(
//sampleStart
fx {
  continueOn(NonBlocking)
  !effect { println(Thread.currentThread().name) }
}
//sampleEnd
)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---


### Arrow Fx Vs Kotlinx Coroutines

Kotlinx Coroutines cancellation is **cooperative**

```kotlin

import kotlinx.coroutines.*

//sampleStart
fun program() = GlobalScope.launch(Dispatchers.Default) {
  var iterations = 0
  while (isActive) { // cancellable computation loop
    println("job: I'm sleeping ${iterations++} ...")
  }
}

suspend fun canceler() { 
  val job = program()
  delay(1300L) // delay a bit
  println("main: I'm tired of waiting!")
  job.cancelAndJoin() // cancels the job and waits for its completion
  println("main: Now I can quit.")
}
//sampleEnd

fun main() = runBlocking {
  canceler()
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### Arrow Fx Vs Kotlinx Coroutines

Arrow Fx cancellation is automatic

```kotlin

import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
import kotlinx.coroutines.*

//sampleStart
fun program(): IO<Unit> {
  fun loop(iterations: Int): IO<Unit> = fx {
    !effect { println("job: I'm sleeping ${iterations} ...") }
    !loop(iterations + 1) 
  }
  return loop(0)
}

fun canceler() = fx {
  val (_, cancel) = !NonBlocking.startFiber(program())
  !effect { delay(1300) }
  !effect { println("main: I'm tired of waiting!") }
  !cancel
  !effect { println("main: Now I can quit.") }
}
//sampleEnd
fun main() {
  canceler().unsafeRunSync()
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

Arrow Fx Vs Kotlinx Coroutines

Arrow Fx concurrent ops abstract over function arity and tracks all typed participants

```kotlin

import arrow.effects.extensions.io.fx.fx

fun main() {
  //sampleStart
  val program = fx {
    val op1 = effect { "first" }
    val op2 = effect { 2 }
    val race = !NonBlocking.raceN(op1, op2)
    val winner = race.fold({ "first one won" }, { "second one won" })
    !effect { println(winner) }
  }
  //sampleEnd
  program.unsafeRunSync()
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### Arrow Fx Vs Kotlinx Coroutines

KotlinX Coroutines does not support explicit races or arity abstraction

```kotlin

import kotlinx.coroutines.*
import kotlinx.coroutines.selects.select

fun main() {
  runBlocking {
    //sampleStart
    // jobs returning different types coerce to `Any`
    val list: List<Deferred<Any>> = listOf(
      GlobalScope.async(Dispatchers.Default) { "first" },
      GlobalScope.async(Dispatchers.Default) { 2 }
    )
    val winner = select<String> {
      list.withIndex().forEach { (index, deferred) ->
        deferred.onAwait { "$index one won" }
      }
    }
    println(winner)
    // Racing requires explicit cooperative cancellation
    list.filter { it.isActive }.map { it.cancel() }
    //sampleEnd
  }
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### Arrow Fx Vs Kotlinx Coroutines

KotlinX Coroutines is unable to auto-release resources when jobs are canceled

```kotlin

import arrow.effects.extensions.io.fx.fx
import kotlinx.coroutines.*

// Guaranteeing resource safety with eagerness is impossible...
class File(url: String) {
  fun open(): File = this
  fun close(): Unit = println("Closing file")
  override fun toString(): String = "This file contains some interesting content"

  companion object {
    suspend fun acquire(uri: String): File = File(uri).open()
    suspend fun use(file: File): String = file.toString()
    suspend fun release(file: File): Unit = file.close()
  }
}
//sampleStart
suspend fun program(): Unit {
  //if cancellation happens before `file` is bound `release` will never ne invoked
  val file: File = withContext(Dispatchers.Default) {
    val file = File.acquire("data.json")
    println("File is now open")
    delay(1300)
    file
  }
  println("-> Acquired")
  try {
    println("-> Use")
    File.use(file)
  } catch (e: Throwable) {
    println("-> Caught $e")
  } finally {
    println("-> Release")
    File.release(file)
  }
}
//sampleEnd

fun main() {
  runBlocking {
    val job: Job = GlobalScope.launch { program() }
    delay(1000)
    job.cancel()
  }
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### Arrow Fx Vs Kotlinx Coroutines

Arrow Fx guarantees resources are released regardless of async ops or cancellation

```kotlin

import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
import arrow.effects.typeclasses.ExitCase
import kotlinx.coroutines.delay

// Guaranteeing resource safety with eagerness is impossible...
class File(url: String) {
  fun open(): File = this
  fun close(): Unit = println("Closing file")
  override fun toString(): String = "This file contains some interesting content"

  companion object {
    suspend fun acquire(uri: String): File = File(uri).open()
    suspend fun use(file: File): String = file.toString()
    suspend fun release(file: File): Unit = file.close()
  }
}
//sampleStart
fun program(): IO<String> = fx {
  val acquire = effect {
    val file = File("data.json").open()
    println("File is now open")
    delay(1300)
    file
  }
  val use = { file: File -> effect { File.use(file) } }
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
  fx {
    val fiber = !NonBlocking.startFiber(program())
    !effect { delay(1000) }
    !fiber.cancel()
  }.unsafeRunSync()
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### Performance

Direct style eliminates the need for `just`, `map`, `flatMap` and the Functor hierarchy

```kotlin

import arrow.effects.IO

//sampleStart
fun ioFibLazy(n: Int): IO<Int> =
  if (n <= 1) IO.just(n)
  else ioFibLazy(n - 1).flatMap { a ->
    ioFibLazy(n - 2).flatMap { b -> IO { a + b } }
  }
//sampleEnd
```
<!-- .element: class="arrow" data-executable="false" -->

```kotlin

tailrec suspend fun directFibLazy(n: Int, prev: Int = 1, current: Int = 0): Int =
    if (n <= 0) current
    else directFibLazy(n - 1, prev + current, prev)
```
<!-- .element: class="arrow" data-executable="false" -->

---

### Performance

#### Direct style Vs Wrapped Style

*Direct style is blazing fast*

![Direct Style Vs Wrapped Style](css/images/DirectSyntax_bench.png)

---

### Performance

*Arrow Fx fibers are fast*

![Fibers performance](css/images/forkFiber_bench.png)

---

### Arrow Fx Vs Kotlinx Coroutines

*Both Arrow Fx and KolinX are great for concurrent programming*

|        | Arrow Fx | KotlinX Coroutines |
|--------|--------|--------|
| __Pure FP__ | ✓ | x |
| __Polymorphic__ | ✓ | x |
| __Resource Safety__ | ✓ (Bracket) | x (try/catch/finally) |
| __Cancellation__ | ✓ (automatic) | ✓ (cooperative) |
| __Performance__ | ✓ | ✓ |
| __Streaming__ | x (coming up) | ✓ (Flow) |

---

## Thanks!

Thanks to everyone that makes Λrrow Fx and KotlinX possible!

![47 Degrees](css/images/47deg-logo.png)  ![Kotlin](css/images/kotlin.png)
