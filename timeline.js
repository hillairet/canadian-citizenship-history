function loadTimeline(historicalData) {
  var events = [];
  // Reshape the JSON data to move the class field into each event object
  historicalData.groups.forEach(function(group) {
    group.events.forEach(function(evt) {
      if (group.emoji !== undefined) {
        evt.emoji = group.emoji;
      }
      evt.group = group.title;
      events.push(evt)
    });
  });


  // Sort the events based on date
  events.sort(function(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA - dateB;  // Ascending order
  });

  // Get the container div
  var container = document.getElementById('container');

  // Loop through the events and create timeline items
  events.forEach(function(evt) {
    var timelineItem = document.createElement('div');
    timelineItem.className = "timeline-item";
    if (evt.emoji === undefined) {
      timelineItem.setAttribute('date-is', evt.date);
    } else {
      timelineItem.setAttribute('date-is',  evt.emoji + " " + evt.date);
    }

    var title = document.createElement('h2');
    title.textContent = evt.title;
    timelineItem.appendChild(title);

    if (evt.description !== undefined) {
      var descriptionList = document.createElement('ul');
      if (Array.isArray(evt.description)) {
        evt.description.forEach(function(descriptionItem) {
          var listItem = document.createElement('li');
          listItem.textContent = descriptionItem;
          descriptionList.appendChild(listItem);
        });
      } else {
        var listItem = document.createElement('li');
        listItem.textContent = evt.description;
        descriptionList.appendChild(listItem);
      }
      timelineItem.appendChild(descriptionList);
    }


    container.appendChild(timelineItem);
  });
}
