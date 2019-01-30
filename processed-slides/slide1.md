## First slide

An Arrow playground example.

{: data-executable='true'}

```kotlin

import arrow.*
import arrow.core.*
import arrow.data.*

fun main(args: Array<String>) {
    val result =
    //sampleStart
    Option(1).map { it * 2 }
    //sampleEnd
    println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->
