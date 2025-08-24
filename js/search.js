(() => {
  let fetched = false, fetching = false, waiting = false
  let datas
  const path = config.root + 'search.json'
  const input = getElement('#search-input')
  const nav = getElement('nav')
  const activeHolder = config.search.activeHolder
  const blurHolder = config.search.blurHolder
  const noResult = config.search.noResult
  const popup = getElement('.search-popup')
  function fetechData() {
    fetching = true
    fetch(path)
      .then(response => response.text())
      .then(res => {
        fetched = true
        datas = JSON.parse(res)
        if (waiting === true) {
          inputEventFunction()
        }
      }).catch(() => fetching = false)
  }
  if (config.search.preload) {
    fetechData()
  }
  function getIndexByWord(word, text, caseSensitive) {
    let wordLen = word.length
    if (wordLen === 0) return []
    let startPosition = 0
    let position = []
    let index = []
    if (!caseSensitive) {
      text = text.toLowerCase()
      word = word.toLowerCase()
    }
    while ((position = text.indexOf(word, startPosition)) > -1) {
      index.push({
        position: position,
        word: word
      })
      startPosition = position + wordLen
    }
    return index
  }
  function mergeIntoSlice(start, end, index, searchText) {
    let item = index[index.length - 1]
    let position = item.position
    let word = item.word
    let hits = []
    let searchTextCountInSlice = 0
    while (position + word.length <= end && index.length !== 0) {
      if (word === searchText) {
        searchTextCountInSlice++
      }
      hits.push({
        position: position,
        length: word.length
      })
      let wordEnd = position + word.length
      index.pop()
      while (index.length !== 0) {
        item = index[index.length - 1]
        position = item.position
        word = item.word
        if (wordEnd > position) {
          index.pop()
        } else {
          break
        }
      }
    }
    return {
      hits: hits,
      start: start,
      end: end,
      TextCount: searchTextCountInSlice
    }
  }
  function highlightKeyword(text, slice) {
    let result = ''
    let prevEnd = slice.start
    slice.hits.forEach(hit => {
      result += text.substring(prevEnd, hit.position)
      let end = hit.position + hit.length
      result += `<nobr class="search-keyword">${text.substring(hit.position, end)}</nobr>`
      prevEnd = end
    })
    result += text.substring(prevEnd, slice.end)
    return result
  }
  function inLoading() {
    getElement('#search-result').innerHTML = '<div id="loading"><div><p>Loading...</p></div></div>'
  }
  function onPopupClose() {
    if (document.querySelector('.up') && document.querySelector('.closed')) {
      getElement('.navBtn').classList.remove('expanded')
    }
    getElement('#search-result').querySelectorAll('a').
      forEach((item) => item.setAttribute('tabindex', -1))
    document.body.classList.remove('blur')
    popup.classList.remove('open')
  }
  function proceedSearch() {
    document.body.classList.add('blur')
    if (document.querySelector('.up') && document.querySelector('.closed')) {
      getElement('.navBtn').classList.add('expanded')
    }
    getElement('#search-result').removeAttribute('tabindex')
    popup.classList.add('open')
    if (fetched === true) {
      popup.innerHTML = "<div id='search-result'></div>"
      document.getElementById('search-result').innerHTML = ''
    } else {
      inLoading()
    }
  }
  function inputEventFunction() {
    let searchText = input.value.trim().toLowerCase()
    if (!searchText.length) {
      input.placeholder = activeHolder
      onPopupClose()
      return
    }
    proceedSearch()
    if (fetched === false) {
      return
    }
    let keywords = searchText.split(/[-\s]+/)
    if (keywords.length > 1) {
      keywords.push(searchText)
    }
    let resultItems = []
    if (searchText.length > 0) {
      datas.forEach(data => {
        if (!data.title) {
          return
        }
        let TextCount = 0, TitleCount = 0, ContentCount = 0
        let title = data.title.trim()
        let titleInLowerCase = title.toLowerCase()
        let content = data.content ? data.content.trim().replace(/<[^>]+>/g, '') : ''
        let contentInLowerCase = content.toLowerCase()
        let articleUrl = decodeURIComponent(data.url).replace(/\/{2,}/g, '/')
        let indexOfTitle = []
        let indexOfContent = []
        keywords.forEach(keyword => {
          let hitInTitle = getIndexByWord(keyword, titleInLowerCase, false)
          let hitInContent = getIndexByWord(keyword, contentInLowerCase, false)
          indexOfTitle = indexOfTitle.concat(hitInTitle)
          indexOfContent = indexOfContent.concat(hitInContent)
          if (hitInTitle.length > 0 || hitInContent.length > 0) {
            TextCount++
          }
          if (hitInTitle.length > 0) {
            TitleCount++
          }
          if (hitInTitle.length > 0 || hitInContent.length > 0) {
            ContentCount++
          }
        })
        if (indexOfTitle.length > 0 || indexOfContent.length > 0) {
          [indexOfTitle, indexOfContent].forEach(index => {
            index.sort((itemLeft, itemRight) => {
              if (itemRight.position !== itemLeft.position) {
                return itemRight.position - itemLeft.position
              }
              return itemLeft.word.length - itemRight.word.length
            })
          })

          let slicesOfTitle = []
          let slicesOfContent = []
          if (indexOfTitle.length !== 0) {
            let tmp = mergeIntoSlice(0, title.length, indexOfTitle, searchText)
            slicesOfTitle.push(tmp)
          }
          let upperBound = parseInt(config.top_n_per_article, 10)
          if (upperBound >= 0) {
            slicesOfContent = slicesOfContent.slice(0, upperBound)
          }
          let resultItem = ''
          if (slicesOfTitle.length !== 0) {
            resultItem += `<a href="${articleUrl}" class="recent-post"><b class="search-result-title">${highlightKeyword(title, slicesOfTitle[0])}</b>`
          } else {
            resultItem += `<a href="${articleUrl}" class="recent-post"><b class="search-result-title">${title}</b>`
          }
          if (indexOfContent !== null && indexOfContent.length !== 0) {
            let item = indexOfContent[indexOfContent.length - 1]
            let position = item.position
            let word = item.word
            let start = position - 20
            let end = position + 80
            if (start < 0) {
              start = 0
            }
            if (end < position + word.length) {
              end = position + word.length
            }
            if (end > content.length) {
              end = content.length
            }
            let tmp = mergeIntoSlice(start, end, indexOfContent, searchText)
            resultItem += `<p class="search-result">${highlightKeyword(content, tmp)}...</p>`
          } else {
            resultItem += `<p class="search-result">${content}...</p>`
          }
          resultItem += '</a>'
          resultItems.push({
            item: resultItem,
            TextCount: TextCount,
            TitleCount: TitleCount,
            ContentCount: ContentCount,
            id: resultItems.length
          })
        }
      })
    }
    popup.scroll({ top: 0, left: 0 })
    let resultList = getElement('#search-result')
    if (resultItems.length === 0) {
      resultList.innerHTML =
        `<div id="no-result"><p>${format(noResult, `<b>${input.value}</b>`)}</p></div>`
    } else {
      resultItems.sort((Left, Right) => {
        if (Left.TextCount !== Right.TextCount) {
          return Right.TextCount - Left.TextCount
        } else if (Left.TitleCount !== Right.TitleCount) {
          return Right.TitleCount - Left.TitleCount
        } else if (Left.ContentCount !== Right.ContentCount) {
          return Right.ContentCount - Left.ContentCount
        }
        return Right.id - Left.id
      })
      let searchResultList = ""
      resultItems.forEach(result => {
        searchResultList += result.item
      })
      resultList.innerHTML = searchResultList
    }
    if (typeof pjax !== 'undefined') {
      pjax.refresh(resultList)
    }
  }
  input.addEventListener('keypress', event => {
    if (event.key === 13) {
      inputEventFunction()
    }
  })
  let lastEvent = 0
  function StartSearch() {
    nav.classList.add('search')
    nav.classList.add('search-moving')
    clearTimeout(lastEvent)
    lastEvent = setTimeout(() => nav.classList.remove('search-moving'), 600)
    header.closeAll()
    if (document.querySelector('.up')) {
      getElement('main').style.pointerEvents = 'none'
    }
    input.placeholder = activeHolder
    if (!fetched) {
      if (!fetching) {
        fetechData()
      }
      waiting = true
    }
  }
  function EscapeSearch() {
    if (!nav.classList.contains('search')) {
      return
    }
    nav.classList.remove('search')
    nav.classList.add('search-moving')
    clearTimeout(lastEvent)
    lastEvent = setTimeout(() => nav.classList.remove('search-moving'), 600)
    onPopupClose()
    input.value = ''
    input.placeholder = blurHolder
    document.removeEventListener('mouseup', EscapeSearch)
    waiting = false
    getElement('main').style.pointerEvents = ''
    input.blur()
  }
  input.addEventListener('keyup', () => {
    nav.classList.add('search')
    inputEventFunction()
  })
  input.addEventListener('focus', () => {
    StartSearch()
  })
  input.addEventListener('blur', event => {
    if (!event.relatedTarget ||
      event.relatedTarget.parentElement !== getElement('#search-result')) {
      EscapeSearch()
    }
  })
  popup.addEventListener('focusout', event => {
    if (!event.relatedTarget ||
      (event.relatedTarget !== input &&
        event.relatedTarget.parentElement !== getElement('#search-result'))) {
      EscapeSearch()
    }
  })
  document.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      EscapeSearch()
    } else if (event.key === 'f' && 
      !['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
      if (!document.querySelector('.up')) {
        getElement('.navBtn').classList.remove('hide')
        header.open()
      }
      StartSearch()
      input.focus()
    }
  })
  document.addEventListener('click', event => {
    if (event.target.tagName === 'A' ||
      event.target.parentElement.tagName === 'A') {
      EscapeSearch()
    }
  })
})()
