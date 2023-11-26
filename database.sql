
TABLE user {
    id SERIAL [pk]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    first_name VARCHAR(255) [NOT NULL]
    last_name VARCHAR(255) [NOT NULL]
    state VARCHAR(255) [NOT NULL]
    city VARCHAR(255) [NOT NULL]
    date_of_birth DATE [NOT NULL]
    password VARCHAR(1000) [NOT NULL]
    email VARCHAR(255) [NOT NULL]
    access_level VARCHAR(255) [NOT NULL]
}

TABLE user_family {
    id SERIAL [pk]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
    user_id INT [ref: > user.id]
    family_id INT [ref: > family.id]
}

TABLE family {
    id SERIAL [pk]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
}

TABLE event {
    id SERIAL [pk]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
    date DATE [NOT NULL]
    detail TEXT
    family_id INT [ref: > family.id]
    time CURRENT_TIMESTAMP
    type VARCHAR(255)
}


TABLE user_event {
    id SERIAL [pk]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
    event_id INT [ref: > event.id]
    user_id INT [ref: > user.id]
    attending BOOLEAN [NOT NULL]
}

TABLE resource {
  id SERIAL [pk]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
  access_level VARCHAR(255) [NOT NULL] 
  }

TABLE response {
    id SERIAL [pk]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
    user_id INT [ref: > user.id]
    date DATE [NOT NULL]
    question_id INT
    response TEXT
    score INT 
}

TABLE question {
   id SERIAL [pk]
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
}

TABLE journal {
    id SERIAL [pk]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
    prompt_id INT [ref: > prompt.id]
    user_id INT [ref: > user.id]
    date DATE [NOT NULL]
    detail TEXT
}

TABLE prompt
{
    id SERIAL [pk]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
    detail TEXT
}
