(function($, _I, _C, _T){
    $(function(){
        $.getJSON('transfer.min.json', function(transfer){
            var t = _I('transfer'),
                length = transfer.length
            for (var i = 0; i < length; ++i) {
                var school = transfer[i],
                    space = _C('div'),
                    container = _C('div'),
                    school_seal = _C('img'),
                    school_name = _T(school.name),
                    school_published = _C('span'),
                    school_title = _C('h3'),
                    school_title_container = _C('div')

                container.id = 'container-' + school.id
                container.className = 'school school-' + school.id

                school_seal.alt = school.name
                school_seal.src = 'images/' + school.id + ('ttu' === school.id ? '.png' : '.svg')
                school_seal.className = 'seal seal-' + school.id
                school_published.className = 'badge badge-' + (school.published ? 'primary' : 'secondary')
                school_published.textContent = (school.published ? '簡章已公布' : '簡章未公布')
                school_published.style.marginLeft = '8px'
                school_title.appendChild(school_seal)
                school_title.appendChild(school_name)
                school_title.appendChild(school_published)
                school_title_container.appendChild(school_title)
                school_title_container.className = 'title'
                container.appendChild(school_title_container)

                if (school.published) {
                    var table = _C('table'), table_body = _C('tbody'),
                        price = _C('tr'), price_head = _C('th'), price_content = _C('td'),
                        regist = _C('tr'), regist_head = _C('th'), regist_content = _C('td'),
                        tests = _C('tr'), tests_head = _C('th'), tests_content = _C('td'),
                        result = _C('tr'), result_head = _C('th'), result_content = _C('td'),
                        signup = _C('tr'), signup_head = _C('th'), signup_content = _C('td')

                    price_head.textContent = '報名費用'
                    price_content.textContent = 'NT$' + school.price.toFixed().replace(/\d(?=(\d{3})+$)/g, '$&,')
                    price.appendChild(price_head)
                    price.appendChild(price_content)
                    table_body.appendChild(price)

                    regist_head.textContent = '報名期間'
                    regist_content.textContent = school.registration.from + ' 至 ' + school.registration.to
                    regist.appendChild(regist_head)
                    regist.appendChild(regist_content)
                    table_body.appendChild(regist)

                    for (var grade_id in school.grade) {
                        var grade = school.grade[grade_id],
                            grade_table = _C('table'), grade_table_body = _C('tbody'),
                            grade_name = _C('tr'), grade_name_head = _C('th'), grade_name_content = _C('td'),
                            grade_date = _C('tr'), grade_date_head = _C('th'), grade_date_content = _C('td'),
                            grade_qualify = _C('tr'), grade_qualify_head = _C('th'), grade_qualify_content = _C('td')

                        grade_name_head.textContent = '級別'
                        grade_name_content.textContent = {second: '二年級', third: '三年級'}[grade_id]
                        grade_name.appendChild(grade_name_head)
                        grade_name.appendChild(grade_name_content)
                        grade_table_body.appendChild(grade_name)

                        grade_date_head.textContent = '考試日期'
                        grade_date_content.textContent = grade.date
                        grade_date.appendChild(grade_date_head)
                        grade_date.appendChild(grade_date_content)
                        grade_table_body.appendChild(grade_date)

                        grade_qualify_head.textContent = '錄取人數'
                        grade_qualify_content.textContent = grade.qualify
                        grade_qualify.appendChild(grade_qualify_head)
                        grade_qualify.appendChild(grade_qualify_content)
                        grade_table_body.appendChild(grade_qualify)

                        for (var j = 0; j < grade.test.length; ++j) {
                            var test_info = grade.test[j],
                                test_row = _C('tr'), test_head = _C('th'), test_content = _C('td'),
                                test_from = _T(test_info.time.from), test_to = _T(test_info.time.to), test_break = _C('br')

                            test_head.appendChild(test_from)
                            test_head.appendChild(test_break)
                            test_head.appendChild(test_to)
                            test_content.textContent = test_info.name
                            test_content.style.verticalAlign = 'middle'
                            test_row.appendChild(test_head)
                            test_row.appendChild(test_content)
                            grade_table_body.appendChild(test_row)
                        }
                        grade_table.style.float = 'left'
                        grade_table.appendChild(grade_table_body)
                        tests_content.appendChild(grade_table)
                    }

                    tests_head.textContent = '考試科目'
                    tests.appendChild(tests_head)
                    tests.appendChild(tests_content)
                    table_body.appendChild(tests)

                    result_head.textContent = '錄取放榜'
                    result_content.textContent = school.result.date
                    result.appendChild(result_head)
                    result.appendChild(result_content)
                    table_body.appendChild(result)

                    signup_head.textContent = '報到註冊'
                    signup_content.textContent = school.signup.from + ' 至 ' + school.signup.to
                    signup.appendChild(signup_head)
                    signup.appendChild(signup_content)
                    table_body.appendChild(signup)

                    table.className = 'table table-responsive'
                    table.appendChild(table_body)
                    container.appendChild(table)
                }

                space.className = 'space-70'
                space.id = school.id
                t.appendChild(space)
                t.appendChild(container)
            }
        })
    })
}(jQuery, (id) => document.getElementById(id), (tag) => document.createElement(tag), (text) => document.createTextNode(text)))
