import React from 'react'

const TagResultView = () => {
  return (
    <>
    <Container>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        type={type}
        setSearch={setSearch}
      />
      <div></div>
    </Container>
    </>
  )
}

export default TagResultView