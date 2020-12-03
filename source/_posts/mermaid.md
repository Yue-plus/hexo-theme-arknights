---
title: 图表示例
date: 2020-04-14 19:11:08
tags: code
category: Example
permalink: /mermaid/
---

![mermaid](https://mermaid-js.github.io/mermaid/img/header.png)

<!-- more -->

主题通过 [mermaid-js](https://mermaid-js.github.io/mermaid/#/)（[GitHub](https://github.com/mermaid-js/mermaid)）绘制各种图表。

支持：
- [流程图](https://mermaid-js.github.io/mermaid/#/flowchart)
- [序列图](https://mermaid-js.github.io/mermaid/#/sequenceDiagram)
- [类图](https://mermaid-js.github.io/mermaid/#/classDiagram)
- [状态图](https://mermaid-js.github.io/mermaid/#/stateDiagram)
- [实体关系图](https://mermaid-js.github.io/mermaid/#/entityRelationshipDiagram)
- [用户旅程图](https://mermaid-js.github.io/mermaid/#/user-journey)
- [甘特图](https://mermaid-js.github.io/mermaid/#/gantt)
- [指令图](http://mermaid-js.github.io/mermaid/diagrams-and-syntax-and-examples/directives.html)
- [饼图](https://mermaid-js.github.io/mermaid/#/pie)

> [关于写作那些事之快速上手 Mermaid 流程图](https://baijiahao.baidu.com/s?id=1666117882411053133)

## 流程图

> <div class="mermaid">
> graph LR
>     A[Hard edge] -->|Link text| B(Round edge)
>     B --> C{Decision}
>     C -->|One| D[Result one]
>     C -->|Two| E[Result two]
> </div>

```html
<div class="mermaid">
graph LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
</div>
```

## 序列图

> <div class="mermaid">
> sequenceDiagram
>     autonumber
>     Alice->>John: Hello John, how are you?
>     loop Healthcheck
>         John->>John: Fight against hypochondria
>     end
>     Note right of John: Rational thoughts!
>     John-->>Alice: Great!
>     John->>Bob: How about you?
>     Bob-->>John: Jolly good!
> </div>

```html
<div class="mermaid">
sequenceDiagram
    autonumber
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
</div>
```

## 类图

> <div class="mermaid">
> classDiagram
> classA --|> classB : Inheritance
> classC --* classD : Composition
> classE --o classF : Aggregation
> classG --> classH : Association
> classI -- classJ : Link(Solid)
> classK ..> classL : Dependency
> classM ..|> classN : Realization
> classO .. classP : Link(Dashed)
> </div>

```html
<div class="mermaid">
classDiagram
classA --|> classB : Inheritance
classC --* classD : Composition
classE --o classF : Aggregation
classG --> classH : Association
classI -- classJ : Link(Solid)
classK ..> classL : Dependency
classM ..|> classN : Realization
classO .. classP : Link(Dashed)
</div>
```

## 状态图

> <div class="mermaid">
>     stateDiagram-v2
>         State1: The state with a note
>         note right of State1
>             Important information! You can write
>             notes.
>         end note
>         State1 --> State2
>         note left of State2 : This is the note to the left.
> </div>

```html
<div class="mermaid">
    stateDiagram-v2
        State1: The state with a note
        note right of State1
            Important information! You can write
            notes.
        end note
        State1 --> State2
        note left of State2 : This is the note to the left.
</div>
```

## 实体关系图

> <div class="mermaid">
> erDiagram
>     CUSTOMER ||--o{ ORDER : places
>     ORDER ||--|{ LINE-ITEM : contains
>     CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
> </div>

```html
<div class="mermaid">
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
</div>
```

## 用户旅程图

> <div class="mermaid">
> journey
>     title My working day
>     section Go to work
>       Make tea: 5: Me
>       Go upstairs: 3: Me
>       Do work: 1: Me, Cat
>     section Go home
>       Go downstairs: 5: Me
>       Sit down: 5: Me
> </div>

```html
<div class="mermaid">
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
</div>
```

## 甘特图

> <div class="mermaid">
> gantt
>     title A Gantt Diagram
>     dateFormat  YYYY-MM-DD
>     section Section
>     A task           :a1, 2014-01-01, 30d
>     Another task     :after a1  , 20d
>     section Another
>     Task in sec      :2014-01-12  , 12d
>     another task      : 24d
> </div>

```html
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
</div>

```

## 指令图

> <div class="mermaid">
> %%{init: { 'logLevel': 'debug', 'theme': 'dark' } }%%
> sequenceDiagram
> %%{config: { 'fontFamily': 'Menlo', 'fontSize': 18, 'fontWeight': 400} }%%
> Alice->>Bob: Hi Bob
> Bob->>Alice: Hi Alice
> </div>

```html
<div class="mermaid">
%%{init: { 'logLevel': 'debug', 'theme': 'dark' } }%%
sequenceDiagram
%%{config: { 'fontFamily': 'Menlo', 'fontSize': 18, 'fontWeight': 400} }%%
Alice->>Bob: Hi Bob
Bob->>Alice: Hi Alice
</div>
```

## 饼图

> <div class="mermaid">
> pie
>     title Key elements in Product X
>     "Calcium" : 42.96
>     "Potassium" : 50.05
>     "Magnesium" : 10.01
>     "Iron" :  5
> </div>

```html
<div class="mermaid">
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
</div>
```