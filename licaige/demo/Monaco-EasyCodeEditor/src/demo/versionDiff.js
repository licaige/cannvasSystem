// 比较文件
async versionDiff (index) {
    let newId = this.versionList[index].id
    let oldId = this.versionList[index + 1].id
    let newContentResult = await this.fetchContentDetail(newId)
    this.content = this.language === 'json' ? JSON.stringify(JSON.parse(newContentResult), null, '\t') : JSON.parse(newContentResult).content
    let oldContentResult = await this.fetchContentDetail(oldId)
    this.oldContent = this.language === 'json' ? JSON.stringify(JSON.parse(oldContentResult), null, '\t') : JSON.parse(oldContentResult).content
    this.dialogDiffVisible = true
}
}
